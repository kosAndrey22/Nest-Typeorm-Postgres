import { validatePassword } from './password.validator';

export class UserValidator {
  public static validatePassword(password: string): boolean {
    return validatePassword(password);
  }
}
