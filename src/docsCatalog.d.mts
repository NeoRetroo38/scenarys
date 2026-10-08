export interface PublicDocument { group: string; slug: string; title: string; description: string; files: string[] }
export const DOC_GROUPS: Record<string, string>;
export const documents: PublicDocument[];
export const DOCS_BASE: string;
export function formatOf(file: string): string;
