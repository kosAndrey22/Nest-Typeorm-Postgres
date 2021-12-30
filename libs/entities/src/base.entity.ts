import { ApiProperty } from '@nestjs/swagger';
import { ClassConstructor, Exclude, Expose, plainToClass } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Exclude()
export class BaseEntity<T extends Record<string, any>> {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @Expose()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  constructor(object: Partial<T & BaseEntity<never>>) {
    Object.assign(this, plainToClass(this.constructor as ClassConstructor<T>, object, { excludeExtraneousValues: true }));
  }
}
