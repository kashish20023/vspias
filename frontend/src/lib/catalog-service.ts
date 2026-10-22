import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomBytes, createHash, scryptSync, timingSafeEqual } from 'node:crypto';

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  division: 'paper' | 'automation';
  image: string;
  alt: string;
  description: string;
  source: string;
  sourcePage: number | null;
  illustrative: boolean;
  visible: boolean;
  order: number;
}

export interface CatalogData {
  schemaVersion: number;
  brochure: string;
  paperBrochure?: string;
  products: ProductItem[];
}

export interface CatalogState {
  revision: number;
  publishedAt: string | null;
  published: CatalogData;
  draft: CatalogData;
}

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const fail = (status: number, message: string): never => {
  throw new HttpError(status, message);
};

const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));

export const publicCatalogue = (c: CatalogData): CatalogData => ({
  ...clone(c),
  products: c.products.filter((p) => p.visible).map((p) => clone(p))
});

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

const FRONTEND_DIR = process.cwd();
const DATA_DIR = path.resolve(FRONTEND_DIR, 'data');
const UPLOADS_DIR = path.resolve(DATA_DIR, 'uploads');
const PUBLIC_DIR = path.resolve(FRONTEND_DIR, 'public');
const STATE_FILE = path.resolve(DATA_DIR, 'catalog.json');
const SEED_FILE = path.resolve(PUBLIC_DIR, 'catalog.seed.json');

let stateCache: CatalogState | null = null;
let queue = Promise.resolve();
const serial = <T>(fn: () => Promise<T>): Promise<T> => {
  const p = queue.then(fn);
  queue = p.catch(() => {}) as unknown as Promise<void>;
  return p;
};

interface SessionData {
  id: string;
  csrf: string;
  expires: number;
}

const sessions = new Map<string, SessionData>();
const attempts = new Map<string, { count: number; until: number }>();
const salt = randomBytes(32);

export const ADMIN_AUTH_DISABLED = false;

export function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD || 'vspias@admin2026').trim();
}

export function isPasswordConfigured(): boolean {
  if (ADMIN_AUTH_DISABLED) return true;
  const pw = getAdminPassword();
  return Boolean(pw && pw.length >= 8);
}

function verifyPassword(candidate: string): boolean {
  const pw = getAdminPassword();
  if (!pw || pw.length < 8) return false;
  const hash = scryptSync(pw, salt, 32);
  const candHash = scryptSync(candidate, salt, 32);
  return timingSafeEqual(candHash, hash);
}

export async function initCatalogState(): Promise<CatalogState> {
  if (stateCache) return stateCache;

  await fs.mkdir(UPLOADS_DIR, { recursive: true, mode: 0o700 });

  let state: CatalogState;
  try {
    const raw = await fs.readFile(STATE_FILE, 'utf8');
    state = JSON.parse(raw);
    if (!state.draft || !state.published || !Number.isInteger(state.revision)) {
      throw new Error('Invalid catalogue state');
    }
  } catch (e: unknown) {
    const err = e as { code?: string };
    if (err.code !== 'ENOENT') throw e;
    const seedRaw = await fs.readFile(SEED_FILE, 'utf8');
    const seed: CatalogData = JSON.parse(seedRaw);
    state = {
      revision: 1,
      publishedAt: null,
      published: clone(seed),
      draft: clone(seed)
    };
    await persistCatalogState(state);
  }
  stateCache = state;
  return stateCache;
}

export async function persistCatalogState(next: CatalogState): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true, mode: 0o700 });
  const tmp = STATE_FILE + '.' + randomBytes(6).toString('hex') + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(next, null, 2), { mode: 0o600 });
  await fs.rename(tmp, STATE_FILE);
  stateCache = next;
}

export function getSession(cookieHeader?: string | null): SessionData | null {
  if (ADMIN_AUTH_DISABLED) {
    return {
      id: 'bypass-admin',
      csrf: 'bypass-csrf-token',
      expires: Date.now() + 86400000
    };
  }
  if (!cookieHeader) return null;
  const id = cookieHeader
    .split(';')
    .map((s) => s.trim())
    .find((s) => s.startsWith('vspias_admin='))
    ?.split('=')[1];
  if (!id) return null;
  const s = sessions.get(id);
  if (s && s.expires > Date.now()) {
    return { ...s, id };
  }
  return null;
}

export function requireSession(cookieHeader?: string | null): SessionData {
  const s = getSession(cookieHeader);
  if (!s) {
    throw new HttpError(401, 'Sign in to the admin panel.');
  }
  return s;
}

export function verifyCsrf(csrfHeader: string | null | undefined, session: SessionData): void {
  if (ADMIN_AUTH_DISABLED) return;
  const a = Buffer.from(String(csrfHeader || ''));
  const b = Buffer.from(session.csrf);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    fail(403, 'Invalid session token. Reload the admin panel.');
  }
}

export function verifyOriginAndHost(headers: Headers): void {
  if (ADMIN_AUTH_DISABLED) return;
  const host = headers.get('host') || '';
  const origin = headers.get('origin');
  const isAllowedHost = host.includes('127.0.0.1') || host.includes('localhost') || host.includes('vspias.in') || process.env.NODE_ENV === 'production';
  if (!isAllowedHost) {
    fail(403, 'Use the verified URL for administrative access.');
  }
  if (origin) {
    const isAllowedOrigin = origin.includes('127.0.0.1') || origin.includes('localhost') || origin.includes('vspias.in') || process.env.NODE_ENV === 'production';
    if (!isAllowedOrigin) {
      fail(403, 'Cross-origin writes are not allowed.');
    }
  }
}

export async function handleLogin(password: string, ip: string): Promise<{ token: string; id: string }> {
  if (!isPasswordConfigured()) {
    fail(503, 'Restart the server with ADMIN_PASSWORD configured.');
  }

  const now = Date.now();
  let a = attempts.get(ip);
  if (!a || a.until < now) {
    a = { count: 0, until: now + 15 * 60 * 1000 };
  }
  if (a.count >= 8) {
    fail(429, 'Too many sign-in attempts. Try again in 15 minutes.');
  }

  if (typeof password !== 'string' || password.length > 512 || !verifyPassword(password.trim())) {
    a.count++;
    attempts.set(ip, a);
    fail(401, 'Incorrect password.');
  }

  attempts.delete(ip);
  const id = randomBytes(32).toString('hex');
  const token = randomBytes(32).toString('hex');
  sessions.set(id, { id, csrf: token, expires: now + 8 * 60 * 60 * 1000 });
  return { token, id };
}

export function handleLogout(session: SessionData): void {
  sessions.delete(session.id);
}

const str = (v: unknown, max: number, required = false): string => {
  if (typeof v !== 'string' || v.length > max || (required && !v.trim())) {
    throw new HttpError(400, 'Invalid or missing catalogue text.');
  }
  return v.trim();
};

export async function validAsset(value: unknown, pdfOnly = false): Promise<string> {
  if (typeof value !== 'string' || !/^(assets|uploads)\/[a-zA-Z0-9_.-]+$/.test(value)) {
    throw new HttpError(400, 'Choose an existing local image or PDF.');
  }
  const valStr = value;
  const ext = path.extname(valStr).toLowerCase();
  if (pdfOnly ? ext !== '.pdf' : !['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
    throw new HttpError(400, 'Unsupported media type.');
  }
  const file = valStr.startsWith('uploads/') ? path.join(DATA_DIR, valStr) : path.join(PUBLIC_DIR, valStr);
  const stat = await fs.stat(file).catch(() => null);
  if (!stat?.isFile()) {
    throw new HttpError(400, 'The selected media file does not exist.');
  }
  return valStr;
}

export async function validateCatalog(c: unknown): Promise<CatalogData> {
  const cat = c as CatalogData;
  if (!cat || cat.schemaVersion !== 1 || !Array.isArray(cat.products) || cat.products.length > 250) {
    fail(400, 'Invalid catalogue.');
  }
  const ids = new Set<string>();
  const products: ProductItem[] = [];

  for (const p of cat.products) {
    if (!p || !['paper', 'automation'].includes(p.division) || typeof p.visible !== 'boolean' || typeof p.illustrative !== 'boolean') {
      fail(400, 'Invalid product settings.');
    }
    const id = str(p.id, 80, true);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id) || ids.has(id)) {
      fail(400, 'Product IDs must be unique, using lowercase letters, numbers and hyphens.');
    }
    ids.add(id);

    if (!Number.isInteger(p.order) || p.order < 0 || p.order > 10000) {
      fail(400, 'Product order must be a whole number from 0 to 10000.');
    }
    if (p.sourcePage !== null && (!Number.isInteger(p.sourcePage) || p.sourcePage < 1 || p.sourcePage > 1000)) {
      fail(400, 'Invalid source page.');
    }

    products.push({
      id,
      name: str(p.name, 120, true),
      brand: str(p.brand, 100, true),
      category: str(p.category, 100, true),
      division: p.division,
      image: await validAsset(p.image),
      alt: str(p.alt, 240, true),
      description: str(p.description, 1500, true),
      source: str(p.source, 240, true),
      sourcePage: p.sourcePage,
      illustrative: p.illustrative,
      visible: p.visible,
      order: p.order
    });
  }

  return {
    schemaVersion: 1,
    brochure: await validAsset(cat.brochure, true),
    paperBrochure: cat.paperBrochure ? await validAsset(cat.paperBrochure, true) : '',
    products
  };
}

export async function saveDraft(revision: number, catalog: unknown): Promise<number> {
  return serial(async () => {
    const state = await initCatalogState();
    if (revision !== state.revision) {
      fail(409, 'This draft changed in another session. Reload the catalogue before saving.');
    }
    const draft = await validateCatalog(catalog);
    const nextState = {
      ...state,
      draft,
      revision: state.revision + 1
    };
    await persistCatalogState(nextState);
    return nextState.revision;
  });
}

export async function publishDraft(revision: number): Promise<{ revision: number; publishedAt: string }> {
  return serial(async () => {
    const state = await initCatalogState();
    if (revision !== state.revision) {
      fail(409, 'This draft changed in another session. Reload the catalogue before saving.');
    }
    const publishedAt = new Date().toISOString();
    const nextState = {
      ...state,
      published: clone(state.draft),
      publishedAt,
      revision: state.revision + 1
    };
    await persistCatalogState(nextState);
    return { revision: nextState.revision, publishedAt };
  });
}

export async function discardDraft(revision: number): Promise<{ revision: number; catalog: CatalogData }> {
  return serial(async () => {
    const state = await initCatalogState();
    if (revision !== state.revision) {
      fail(409, 'This draft changed in another session. Reload the catalogue before saving.');
    }
    const nextState = {
      ...state,
      draft: clone(state.published),
      revision: state.revision + 1
    };
    await persistCatalogState(nextState);
    return { revision: nextState.revision, catalog: nextState.draft };
  });
}

export async function uploadMedia(base64Data: string): Promise<{ path: string; type: string; size: number }> {
  if (typeof base64Data !== 'string' || !base64Data.length || !/^[A-Za-z0-9+/]*={0,2}$/.test(base64Data) || base64Data.length % 4 !== 0) {
    fail(400, 'Invalid file encoding.');
  }

  const bytes = Buffer.from(base64Data, 'base64');
  let ext = '';

  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    ext = '.png';
  } else if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 && bytes.at(-2) === 255 && bytes.at(-1) === 217) {
    ext = '.jpg';
  } else if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') {
    ext = '.webp';
  } else if (bytes.toString('ascii', 0, 5) === '%PDF-') {
    ext = '.pdf';
  } else {
    fail(400, 'Only PNG, JPEG, WebP or PDF files are supported.');
  }

  const limit = (ext === '.pdf' ? 18 : 10) * 1024 * 1024;
  if (bytes.length > limit) {
    fail(413, 'Image limit: 10 MB. PDF limit: 18 MB.');
  }

  await fs.mkdir(UPLOADS_DIR, { recursive: true, mode: 0o700 });
  const filename = createHash('sha256').update(bytes).digest('hex') + ext;
  await fs.writeFile(path.join(UPLOADS_DIR, filename), bytes, { mode: 0o600 });

  return {
    path: 'uploads/' + filename,
    type: TYPES[ext] || 'application/octet-stream',
    size: bytes.length
  };
}

export async function getUploadFile(
  relName: string,
  cookieHeader?: string | null
): Promise<{ buffer: Buffer; contentType: string; isLive: boolean }> {
  if (!/^uploads\/[a-f0-9]{64}\.(png|jpg|webp|pdf)$/.test(relName)) {
    fail(404, 'File not found.');
  }

  const state = await initCatalogState();
  const isLive =
    state.published.brochure === relName ||
    state.published.paperBrochure === relName ||
    state.published.products.some((p) => p.visible && p.image === relName);

  if (!isLive) {
    requireSession(cookieHeader);
  }

  const fullPath = path.join(DATA_DIR, relName);
  try {
    const buffer = await fs.readFile(fullPath);
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = TYPES[ext] || 'application/octet-stream';
    return { buffer, contentType, isLive };
  } catch {
    throw new HttpError(404, 'File not found.');
  }
}
