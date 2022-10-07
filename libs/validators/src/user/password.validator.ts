import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_PATTERN,
} from '@libs/constants';

export const validatePassword = (password: string): boolean => {
  const validateResults = [
    validatePasswordLength(password),
    validatePasswordPattern(password),
  ];
  return validateResults.every((el) => el === true);
};

const validatePasswordLength = (password: string): boolean => {
  return (
    password.length >= MIN_PASSWORD_LENGTH &&
    password.length <= MAX_PASSWORD_LENGTH
  );
};

const validatePasswordPattern = (password: string): boolean => {
  return PASSWORD_PATTERN.test(password);
};
