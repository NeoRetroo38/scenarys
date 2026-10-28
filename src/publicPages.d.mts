export interface PublicPageData {
  path: string; title: string; eyebrow: string; summary: string;
  paragraphs: string[]; next: string; manifest?: boolean; diagram?: boolean; catalog?: 'docs' | 'downloads';
  quote?: string; tone?: 'dark'; actions?: { href: string; label: string }[];
}
export const PUBLIC_ORIGIN: string;
export const publicPages: PublicPageData[];
export function findPublicPage(pathname: string): PublicPageData | undefined;
