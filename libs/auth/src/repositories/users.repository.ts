import { EntityRepository } from 'typeorm';
import { UserEntity } from '@libs/entities';
import { AbstractRepository } from '@libs/repositories';

@EntityRepository(UserEntity)
export class UsersRepository extends AbstractRepository<UserEntity> {

  public getUser(conditions: Partial<UserEntity>, relations: string[] = []): Promise<UserEntity> {
    return this.findOne({ where: conditions, relations });
  }

}