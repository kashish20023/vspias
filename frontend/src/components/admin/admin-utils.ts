import { CatalogData, DiffRow, EnquiryRecord, ProductItem } from './admin-types';

export const dayKey = (d: string | number | Date): string =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(d));

export const formatDateIST = (d: string | null | undefined, withTime = false): string => {
  if (!d) return 'Not published';
  try {
    return (
      new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        ...(withTime ? { hour: '2-digit', minute: '2-digit', hour12: true } : {})
      }).format(new Date(d)) + (withTime ? ' IST' : '')
    );
  } catch {
    return 'N/A';
  }
};

export const formatFullDateIST = (): string =>
  new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

export const safeAssetUrl = (url: string | null | undefined): string => {
  if (!url) return '';
  const clean = String(url).replace(/^\/+/, '');
  if (/^(assets|uploads)\/[a-zA-Z0-9_.-]+$/.test(clean)) return '/' + clean;
  try {
    const parsed = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '';
  } catch {
    return '';
  }
};

export const computeDifferences = (from?: CatalogData | null, to?: CatalogData | null): DiffRow[] => {
  if (!from || !to) return [];
  const rows: DiffRow[] = [];

  to.products.forEach((p) => {
    const previous = from.products.find((x) => x.id === p.id);
    if (!previous) {
      rows.push({ name: p.name, type: 'Added', description: 'New product in this draft', id: p.id });
    } else if (JSON.stringify(previous) !== JSON.stringify(p)) {
      const changed = (Object.keys(p) as Array<keyof ProductItem>).filter((k) => previous[k] !== p[k]);
      rows.push({
        name: p.name,
        type: 'Updated',
        description: changed
          .map((k) => {
            const labels: Record<string, string> = {
              sourcePage: 'brochure citation page',
              alt: 'image description',
              visible: 'website visibility',
              order: 'display position',
              division: 'division'
            };
            return labels[k as string] || (k as string);
          })
          .join(', '),
        id: p.id
      });
    }
  });

  from.products.forEach((p) => {
    if (!to.products.some((x) => x.id === p.id)) {
      rows.push({ name: p.name, type: 'Removed', description: 'Product removed from draft', id: p.id });
    }
  });

  if (from.brochure !== to.brochure) {
    rows.push({ name: 'Industrial automation brochure', type: 'Updated', description: 'Automation PDF changed' });
  }
  if ((from.paperBrochure || '') !== (to.paperBrochure || '')) {
    rows.push({ name: 'Paper packaging brochure', type: 'Updated', description: 'Paper PDF changed' });
  }

  return rows;
};

export async function uploadMediaFile(file: File, isPdf = false, csrfToken = ''): Promise<{ path: string; type: string; size: number }> {
  const limit = (isPdf ? 18 : 10) * 1024 * 1024;
  if (file.size > limit) {
    throw new Error(`File is too large. Limit is ${isPdf ? 18 : 10} MB.`);
  }

  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error('Failed to read the selected file.'));
    reader.readAsDataURL(file);
  });

  const res = await fetch('/api/admin/media', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify({ data: base64 })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Media upload failed.');
  }

  return data;
}
