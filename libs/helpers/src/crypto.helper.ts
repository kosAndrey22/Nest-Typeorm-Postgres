import bcrypt from 'bcrypt';

export const hashValue = (value: string, rounds: number): Promise<string> => {
  return bcrypt.hash(value, rounds);
};

export const compareValues = (
  value: string,
  hashed: string,
): Promise<boolean> => {
  return bcrypt.compare(value, hashed);
};
