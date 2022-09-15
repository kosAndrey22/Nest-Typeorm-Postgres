import { Expose } from 'class-transformer';
import { ConstructableDTO } from '@libs/dtos';

export class GeneralControllerHelloResponseDTO extends ConstructableDTO<GeneralControllerHelloResponseDTO> {
  @Expose()
  message: string;
}
