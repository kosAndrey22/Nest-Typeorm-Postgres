import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ConstructableDTO } from '../utility-dtos';

export class BaseEntityConstructableDTO<T> extends ConstructableDTO<BaseEntityConstructableDTO<T>> {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

}
