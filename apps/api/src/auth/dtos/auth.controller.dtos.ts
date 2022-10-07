import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { ConstructableDTO } from '@libs/dtos';
import { UserDTO } from './auth.dtos';

export class JwtAuthDTO extends ConstructableDTO<JwtAuthDTO> {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class SignInBodyDTO {
  @Expose()
  @IsDefined()
  @IsString()
  @ApiProperty()
  login: string;

  @Expose()
  @IsDefined()
  @ApiProperty()
  password: string;
}

export class SignInResponseDTO extends JwtAuthDTO {}

export class SignUpBodyDTO {
  @Expose()
  @IsDefined()
  @IsString()
  @ApiProperty()
  login: string;

  @Expose()
  @IsDefined()
  @ApiProperty()
  password: string;
}

export class SignUpResponseDTO extends JwtAuthDTO {}

export class MeResponseDTO extends UserDTO {}
