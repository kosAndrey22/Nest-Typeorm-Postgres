import { USER_ROLE } from '@libs/constants';

export interface IUserEntity {
  login: string;
  role: USER_ROLE;
  password: string;
  refreshToken: string | null;
};
