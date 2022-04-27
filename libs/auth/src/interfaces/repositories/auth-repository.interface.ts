import { IAbstractRepository, IUserEntity } from '@libs/interfaces';

export interface IAuthRepository extends IAbstractRepository<IUserEntity> {
  getUser(conditions: Partial<IUserEntity>, relations?: string[]): Promise<IUserEntity>;
};
