import { IUserEntity } from '../entities';
import { IAbstractRepository } from './abstract-repository.interface';

export interface IUsersRepository extends IAbstractRepository<IUserEntity> {
  getUser(conditions: Partial<IUserEntity>, relations?: string[]): Promise<IUserEntity>;
};
