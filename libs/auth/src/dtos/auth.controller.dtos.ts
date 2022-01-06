import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { UserEntity } from '@libs/entities';
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, PASSWORD_PATTERN } from '@libs/constants';

export class SignInBodyDTO {
  @Expose()
  @ApiProperty()
    login: string;

  @Expose()
  @ApiProperty({ minLength: MIN_PASSWORD_LENGTH, maxLength: MAX_PASSWORD_LENGTH, pattern: PASSWORD_PATTERN.toString() })
    password: string;
}

export class SignInResponseDTO {

  @ApiProperty()
    accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export class SignUpBodyDTO {
  @Expose()
  @ApiProperty()
    login: string;

  @Expose()
  @ApiProperty({ minLength: MIN_PASSWORD_LENGTH, maxLength: MAX_PASSWORD_LENGTH, pattern: PASSWORD_PATTERN.toString() })
    password: string;
}

export class SignUpResponseDTO {
  @ApiProperty()
    accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export class MeResponseDTO extends UserEntity { }
