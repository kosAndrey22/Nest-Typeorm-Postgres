import { Repository } from 'typeorm';
import { UserEntity } from '@libs/db';

export class UsersBaseRepository extends Repository<UserEntity> {}
