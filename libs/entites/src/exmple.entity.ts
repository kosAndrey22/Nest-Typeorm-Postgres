import { BaseEntity } from "./base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Column } from "typeorm";

export class ExampleEntity extends BaseEntity<ExampleEntity> {
  @ApiProperty()
  @Expose()
  @Column()
  data: string;
}
