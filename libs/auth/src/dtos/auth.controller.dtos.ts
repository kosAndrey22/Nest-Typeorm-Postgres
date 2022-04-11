import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { Matches, Length, IsDefined, IsString } from 'class-validator';
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, PASSWORD_PATTERN } from '@libs/constants';
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
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
  @Matches(PASSWORD_PATTERN)
  @ApiProperty({ minLength: MIN_PASSWORD_LENGTH, maxLength: MAX_PASSWORD_LENGTH, pattern: PASSWORD_PATTERN.toString() })
  password: string;
}

export class SignInResponseDTO extends JwtAuthDTO { }

export class SignUpBodyDTO {
  @Expose()
  @IsDefined()
  @IsString()
  @ApiProperty()
  login: string;

  @Expose()
  @IsDefined()
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
  @Matches(PASSWORD_PATTERN)
  @ApiProperty({ minLength: MIN_PASSWORD_LENGTH, maxLength: MAX_PASSWORD_LENGTH, pattern: PASSWORD_PATTERN.toString() })
  password: string;
}

export class SignUpResponseDTO extends JwtAuthDTO { }

export class MeResponseDTO extends UserDTO {

}
