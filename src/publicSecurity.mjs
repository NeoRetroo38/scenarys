// One policy for the static host configuration and the local production preview.
// No API endpoint, private network address or runtime secret belongs here.
export const PUBLIC_SECURITY_HEADERS = Object.freeze({
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'",
});

export function publicHeadersFile() {
  return '/*\n' + Object.entries(PUBLIC_SECURITY_HEADERS)
    .map(([name, value]) => `  ${name}: ${value}`).join('\n') + '\n';
}
