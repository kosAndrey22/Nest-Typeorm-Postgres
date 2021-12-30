import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'example' })
export class ExampleEntity extends BaseEntity<ExampleEntity> {
  @ApiProperty()
  @Expose()
  @Column()
  data: string;
}
