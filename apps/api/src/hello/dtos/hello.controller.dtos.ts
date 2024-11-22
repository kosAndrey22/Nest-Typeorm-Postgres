import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ConstructableDTO } from '@libs/dtos';

export class HelloControllerResponseDTO extends ConstructableDTO<HelloControllerResponseDTO> {
  @Expose()
  @ApiProperty()
  message: string;
}
