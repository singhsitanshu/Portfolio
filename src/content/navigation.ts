export const homeSections = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

const legacyHomeAnchors = new Map([['work', 'projects'], ['about', 'introduction']]);

export function anchorIdFor(pathname: string, hash: string): string | null {
  if (!hash) return null;
  try {
    const id = decodeURIComponent(hash.slice(1));
    return pathname === '/' ? legacyHomeAnchors.get(id) ?? id : id;
  } catch {
    return null;
  }
}
