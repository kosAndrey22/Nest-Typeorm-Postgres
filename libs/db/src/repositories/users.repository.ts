import { EntityRepository } from 'typeorm';
import { UserEntity } from '../entities';
import { AbstractRepository } from './abstract.repository';

@EntityRepository(UserEntity)
export class UsersRepository extends AbstractRepository<UserEntity> {

  public getUser(conditions: Partial<UserEntity>, relations: string[] = []): Promise<UserEntity> {
    return this.findOne({ where: conditions, relations });
  }

}
