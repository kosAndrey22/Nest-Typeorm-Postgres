import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { USER_ROLE } from '@libs/constants';
import { IUserEntity } from '@libs/interfaces';
import { BaseEntityConstructableDTO } from '@libs/dtos';

export class UserDTO extends BaseEntityConstructableDTO<UserDTO> implements IUserEntity {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  login: string;

  @Expose()
  @ApiProperty({ enum: USER_ROLE })
  role: USER_ROLE;

  @Exclude()
  @ApiProperty()
  password: string;

  @Exclude()
  @ApiProperty()
  refreshToken: string | null;
}
