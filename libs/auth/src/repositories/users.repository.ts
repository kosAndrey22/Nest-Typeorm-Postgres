import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@libs/entities';

@Injectable()
@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {

  public getUser(conditions: Partial<UserEntity>, relations: string[] = []): Promise<UserEntity> {
    return this.findOne({ where: conditions, relations });
  }

}
