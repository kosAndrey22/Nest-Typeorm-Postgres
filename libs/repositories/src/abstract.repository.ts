import { Repository } from 'typeorm';
import { BaseEntity } from '@libs/entities/base.entity';

export class AbstractRepository<T extends BaseEntity<T>> extends Repository<T> {

  protected getPreparedQuery(sql: string, params: object): [string, any[]] {
    return this.manager.connection.driver.escapeQueryWithParameters(sql, params, {});
  }

  protected queryWithParameters<K>(sql: string, params: object): Promise<K> {
    const queryWithParameters = this.getPreparedQuery(sql, params);
    return this.query(...queryWithParameters);
  }

}
