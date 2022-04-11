import { Expose, Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { USER_ROLE } from '@libs/constants';
import { IUserEntity } from '@libs/interfaces';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_test' })
export class UserEntity extends BaseEntity<UserEntity> implements IUserEntity {
  @Expose()
  @Column()
  login: string;

  @Column({ type: 'enum', enum: USER_ROLE })
  @Expose()
  role: USER_ROLE;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ nullable: true })
  refreshToken: string | null;
}
