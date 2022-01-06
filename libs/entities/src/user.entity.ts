import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { USER_ROLE } from '@libs/constants';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_test' })
export class UserEntity extends BaseEntity<UserEntity> {
  @ApiProperty()
  @Expose()
  @Column()
    login: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: USER_ROLE })
  @Expose()
    role: USER_ROLE;

  @Exclude()
  @Column()
    password: string;
}
