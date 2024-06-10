/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RULETA_API_BASE_URL: string;
  // agregar más variables de entorno aquí
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
