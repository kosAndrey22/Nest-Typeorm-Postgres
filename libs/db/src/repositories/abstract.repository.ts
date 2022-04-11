import { Repository } from 'typeorm';
import { IAbstractRepository } from '@libs/interfaces';
import { DeepPartial } from '@libs/types';
import { BaseEntity } from '../entities';

export abstract class AbstractRepository<Entity extends BaseEntity<Entity>> implements IAbstractRepository<Entity> {

  protected abstract readonly driver: Repository<Entity>;

  public async create(entity: DeepPartial<Entity>): Promise<Entity>;
  public async create(entity: DeepPartial<Entity>[]): Promise<Entity[]>;
  public async create(entity: DeepPartial<Entity> & DeepPartial<Entity>[]): Promise<Entity | Entity[]> {
    const result = await this.driver.create(entity);
    return result;
  }

  public async delete(criteria: string | number | number[] | Partial<Entity>): Promise<any> {
    await this.driver.delete(criteria as any);
    return;
  }

  public async find(entity: Partial<Entity>, relations?: string[]): Promise<Entity[]> {
    const result = await this.driver.find({ where: entity, relations });
    return result;
  }
  public async findOne(entity: Partial<Entity>, relations?: string[]): Promise<Entity> {
    const result = await this.driver.findOne({ where: entity, relations });
    return result;
  }

  public async save(entity: DeepPartial<Entity>): Promise<DeepPartial<Entity>>;
  public async save(entity: DeepPartial<Entity>[]): Promise<DeepPartial<Entity>[]>;
  public async save(entity: DeepPartial<Entity> & DeepPartial<Entity>[]): Promise<DeepPartial<Entity> | DeepPartial<Entity>[]> {
    const result = await this.driver.save(entity);
    return result;
  }

  public async update(criteria: number | number[] | DeepPartial<Entity>, entity: DeepPartial<Entity>): Promise<any> {
    const result = await this.driver.update(criteria as any, entity);
    return result;
  }

  protected getPreparedQuery(sql: string, params: object): [string, any[]] {
    return this.driver.manager.connection.driver.escapeQueryWithParameters(sql, params, {});
  }

  protected queryWithParameters<K>(sql: string, params: object): Promise<K> {
    const queryWithParameters = this.getPreparedQuery(sql, params);
    return this.driver.query(...queryWithParameters);
  }

}
