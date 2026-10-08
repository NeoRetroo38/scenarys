/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHOISYS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
