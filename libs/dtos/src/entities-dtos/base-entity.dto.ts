import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IBaseEntity } from '@libs/interfaces';
import { ConstructableDTO } from '../utility-dtos';

export class BaseEntityDTO<T extends Record<string, any>> extends ConstructableDTO<BaseEntityDTO<T>> implements IBaseEntity {
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
