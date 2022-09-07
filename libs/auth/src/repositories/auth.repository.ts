import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '@libs/auth';
import { UserEntity } from '@libs/db';
import { UsersBaseRepository } from '@libs/db/repositories';

@Injectable()
export class AuthRepository
  extends UsersBaseRepository
  implements IAuthRepository {
  public getUser(
    conditions: Partial<UserEntity>,
    relations: string[] = [],
  ): Promise<UserEntity> {
    return super.findOne({ where: conditions, relations });
  }
}
