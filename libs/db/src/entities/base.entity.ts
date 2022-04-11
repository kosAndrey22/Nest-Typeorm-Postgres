import { ClassConstructor, Exclude, Expose, plainToClass } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IBaseEntity } from '@libs/interfaces';

@Exclude()
export class BaseEntity<T extends Record<string, any>> implements IBaseEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Expose()
  updatedAt: Date;

  constructor(object: Partial<T & BaseEntity<never>>) {
    Object.assign(this, plainToClass(this.constructor as ClassConstructor<T>, object, { excludeExtraneousValues: true }));
  }
}
