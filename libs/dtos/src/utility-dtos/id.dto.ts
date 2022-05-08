import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsNumber } from 'class-validator';
import { ConstructableDTO } from './constructable.dto';

export class IdDTO extends ConstructableDTO<IdDTO> {
  @Type(() => Number)
  @IsInt()
  @IsDefined()
  @IsNumber()
  id: number;
}
