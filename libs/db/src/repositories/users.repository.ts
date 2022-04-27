import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAuthRepository } from '@libs/auth';
import { UserEntity } from '../entities';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class UsersRepository extends AbstractRepository<UserEntity> implements IAuthRepository {

  constructor(
    @InjectRepository(UserEntity) protected readonly connector: Repository<UserEntity>,
  ) {
    super();
  }

  public getUser(conditions: Partial<UserEntity>, relations: string[] = []): Promise<UserEntity> {
    return super.findOne(conditions, relations);
  }

}
