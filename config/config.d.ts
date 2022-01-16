declare module 'config' {

  export const CORS: boolean;
  export const DEVELOPMENT: boolean;

  export const COOKIES_OPTIONS: {
    readonly SAME_SITE: boolean | 'lax' | 'strict' | 'none';
  };

  export const JWT: {
    readonly ACCESS_TOKEN_EXPIRATION: string | number;
    readonly ACCESS_TOKEN_SECRET_KEY: string;
    readonly REFRESH_TOKEN_EXPIRATION: string | number;
    readonly REFRESH_TOKEN_SECRET_KEY: string;
  };

  export const POSTGRES: {
    readonly HOST: string;
    readonly USERNAME: string;
    readonly PASSWORD: string;
    readonly PORT: number;
    readonly DB: string;
    readonly RETRY_ATTEMPTS: number;
    readonly RETRY_DELAY: number;
  };

  export const NODE_ENV: string;
  export const API: {
    readonly PORT: number;
  };

}
