// Define the type of the environment variables.
declare interface Env {
  readonly NG_APP_FIREBASE_API_KEY: string;

}

declare interface ImportMeta {
  readonly env: Env;
}


declare const _NGX_ENV_: Env;

declare namespace NodeJS {
  export interface ProcessEnv extends Env {}
}
