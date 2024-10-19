declare module 'js-cookie' {
  interface CookieAttributes {
    path?: string;
    expires?: number | Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }

  export function get(name: string): string | undefined;
  export function set(
    name: string,
    value: string,
    attributes?: CookieAttributes
  ): void;
  export function remove(name: string, attributes?: CookieAttributes): void;
  export function getJSON(name: string): any;
  export function setJSON(
    name: string,
    value: any,
    attributes?: CookieAttributes
  ): void;
}
