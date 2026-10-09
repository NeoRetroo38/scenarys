export interface AppEntry {
  name: string; route: string; repo: string; kind: 'expo'; project: string; apiUrlEnv?: string;
}
export const LANDING_FOLDERS: string[];
export const apps: AppEntry[];
export function appRoute(name: string): string;
export function appRouteProblems(registry: AppEntry[], pagePaths: string[], landingFolders?: string[]): string[];
