import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export interface EnquiryRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  division?: string;
  company?: string;
  quantity?: string;
  bagFinish?: string;
  brandName?: string;
  industrySector?: string;
  [key: string]: unknown;
}

export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  division?: string;
  company?: string;
  quantity?: string;
  bagFinish?: string;
  brandName?: string;
  industrySector?: string;
  [key: string]: unknown;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const ENQUIRIES_FILE = path.resolve(DATA_DIR, 'enquiries.json');

let writeQueue = Promise.resolve();
const serialize = <T>(fn: () => Promise<T>): Promise<T> => {
  const p = writeQueue.then(fn);
  writeQueue = p.catch(() => {}) as unknown as Promise<void>;
  return p;
};

async function readEnquiriesFile(): Promise<EnquiryRecord[]> {
  try {
    const raw = await fs.readFile(ENQUIRIES_FILE, 'utf8');
    if (!raw.trim()) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err: unknown) {
    const e = err as { code?: string };
    if (e.code === 'ENOENT') {
      return [];
    }
    return [];
  }
}

async function writeEnquiriesFile(records: EnquiryRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true, mode: 0o700 });
  const tmp = ENQUIRIES_FILE + '.' + crypto.randomBytes(6).toString('hex') + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(records, null, 2), { mode: 0o600 });
  await fs.rename(tmp, ENQUIRIES_FILE);
}

export async function getEnquiries(): Promise<EnquiryRecord[]> {
  return readEnquiriesFile();
}

export async function addEnquiry(data: EnquiryInput): Promise<EnquiryRecord> {
  return serialize(async () => {
    const list = await readEnquiriesFile();
    const record: EnquiryRecord = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message
    };
    list.unshift(record);
    await writeEnquiriesFile(list);
    return record;
  });
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  return serialize(async () => {
    const list = await readEnquiriesFile();
    const initialLen = list.length;
    const filtered = list.filter((item) => item.id !== id);
    if (filtered.length !== initialLen) {
      await writeEnquiriesFile(filtered);
      return true;
    }
    return false;
  });
}
