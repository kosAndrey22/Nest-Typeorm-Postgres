import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { POSTGRES } from 'config';
import * as Entities from '@libs/entities';
// import * as Migrations from './migrations';

const entities = Object.values(Entities);
// const migrations = Object.values(Migrations);

export = {
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
  synchronize: true,
  migrations: [],
  logger: 'advanced-console',
  cli: {
    migrationsDir: 'migrations',
  },
} as TypeOrmModuleOptions;
