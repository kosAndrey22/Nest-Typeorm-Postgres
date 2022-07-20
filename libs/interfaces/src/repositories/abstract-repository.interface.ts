import { DeepPartial } from '@libs/types';

export interface IAbstractRepository<Entity> {
  create(entity: DeepPartial<Entity>): Promise<Entity>;
  create(entity: DeepPartial<Entity>[]): Promise<Entity[]>;

  delete(criteria: number | number[] | Partial<Entity>): Promise<any>;

  find(entity: Partial<Entity>, relations?: string[]): Promise<Entity[]>;
  findOne(entity: Partial<Entity>, relations?: string[]): Promise<Entity>;

  save(entity: DeepPartial<Entity>): Promise<DeepPartial<Entity>>;
  save(entity: DeepPartial<Entity>[]): Promise<DeepPartial<Entity>[]>;

  update(criteria: number | number[] | DeepPartial<Entity>, entity: DeepPartial<Entity>): Promise<any>;
}
