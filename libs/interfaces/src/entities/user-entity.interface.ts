import { USER_ROLE } from '@libs/constants';
import { IBaseEntity } from './base-entity.interface';

export interface IUserEntity extends IBaseEntity {
  login: string;
  role: USER_ROLE;
  password: string;
  refreshToken: string | null;
};
