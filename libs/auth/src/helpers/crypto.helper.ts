import bcrypt from 'bcrypt';
import { PASSWORD_SALT_ROUNDS } from '@libs/constants';

export const compare = (password: string, passwordHash: string): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};

export const hashValue = (value: string, rounds: number): Promise<string> => {
  return bcrypt.hash(value, rounds);
};

export const getHashByPassword = (password: string): Promise<string> => {
  return hashValue(password, PASSWORD_SALT_ROUNDS);
};
