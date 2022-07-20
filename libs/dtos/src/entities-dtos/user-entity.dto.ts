import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { USER_ROLE } from '@libs/constants';
import { IUserEntity } from '@libs/interfaces';
import { BaseEntityDTO } from './base-entity.dto';

export class UserEntityDTO extends BaseEntityDTO<UserEntityDTO> implements IUserEntity {
  @Expose()
  @ApiProperty()
  login: string;

  @Expose()
  @ApiProperty()
  role: USER_ROLE;

  @Exclude()
  @ApiProperty()
  password: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;
}
