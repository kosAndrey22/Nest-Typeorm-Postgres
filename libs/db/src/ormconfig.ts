import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { POSTGRES } from 'config';
import * as Migrations from './migrations';
import * as Entities from './entities';

const entities = Object.values(Entities);
const migrations = Object.values(Migrations);

export const TypeORMConfig = {
  type: 'postgres',
  host: POSTGRES.HOST,
  port: POSTGRES.PORT,
  username: POSTGRES.USERNAME,
  password: POSTGRES.PASSWORD,
  database: POSTGRES.DB,
  retryAttempts: POSTGRES.RETRY_ATTEMPTS,
  retryDelay: POSTGRES.RETRY_DELAY,
  migrationsRun: true,
  entities,
  autoLoadModels: true,
  autoLoadEntities: true,
  synchronize: true,
  migrations: migrations,
  logger: 'advanced-console',
  cli: {
    migrationsDir: 'migrations',
  },
} as TypeOrmModuleOptions;
