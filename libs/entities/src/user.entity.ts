import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_test' })
export class UserEntity extends BaseEntity<UserEntity> {
  @ApiProperty()
  @Expose()
  @Column()
    name: string;

  @Exclude()
  @Column()
    hashedPassword: string;
}
