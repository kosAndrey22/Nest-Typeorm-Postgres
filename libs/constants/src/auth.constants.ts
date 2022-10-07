import { JWT } from 'config';
import ms from 'ms';

export const COOKIE = {
  ACCESS_TOKEN: 'Authorization',
  REFRESH_TOKEN: 'Refresh',
};

export const ACCESS_COOKIE_EXPIRES = (): Date =>
  new Date(Date.now() + ms(JWT.ACCESS_TOKEN_EXPIRATION));
export const REFRESH_COOKIE_EXPIRES = (): Date =>
  new Date(Date.now() + ms(JWT.REFRESH_TOKEN_EXPIRATION));

export const PASSWORD_SALT_ROUNDS = 10;
export const MIN_PASSWORD_LENGTH = 4;
export const MAX_PASSWORD_LENGTH = 255;

export const PASSWORD_PATTERN = /^.+$/;

export const REFRESH_TOKEN_SALT_ROUNDS = 10;
