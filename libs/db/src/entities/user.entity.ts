import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { IUser } from '@libs/interfaces';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity implements IUser {
  @Expose()
  @Column()
  login: string;
}
