import { UsersBaseRepository } from '@libs/db';
import { IUserEntity } from '@libs/interfaces';

export interface IAuthRepository extends UsersBaseRepository {
  getUser(
    conditions: Partial<IUserEntity>,
    relations?: string[],
  ): Promise<IUserEntity>;
}
