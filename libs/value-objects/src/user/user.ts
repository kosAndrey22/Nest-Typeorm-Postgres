import {
  PASSWORD_SALT_ROUNDS,
  REFRESH_TOKEN_SALT_ROUNDS,
} from '@libs/constants';
import { compareValues, hashValue } from '@libs/helpers';
import { validatePassword } from './validators';

export class User {
  public static validatePassword(password: string): boolean {
    return validatePassword(password);
  }

  public static comparePassword = (
    password: string,
    passwordHash: string,
  ): Promise<boolean> => {
    return compareValues(password, passwordHash);
  };

  public static compareRefreshTokens = (
    token: string,
    tokeHash: string,
  ): Promise<boolean> => {
    return compareValues(token, tokeHash);
  };

  public static getHashedPassword = (password: string): Promise<string> => {
    return hashValue(password, PASSWORD_SALT_ROUNDS);
  };

  public static getHashedRefreshToken = (token: string): Promise<string> => {
    return hashValue(token, REFRESH_TOKEN_SALT_ROUNDS);
  };
}
