import { EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '@libs/auth';
import { UserEntity, UsersBaseRepository } from '@libs/db';

@Injectable()
@EntityRepository(UserEntity)
export class AuthRepository
  extends UsersBaseRepository
  implements IAuthRepository {
  public getUser(
    conditions: Partial<UserEntity>,
    relations: string[] = [],
  ): Promise<UserEntity> {
    return this.findOne({ where: conditions, relations });
  }
}
