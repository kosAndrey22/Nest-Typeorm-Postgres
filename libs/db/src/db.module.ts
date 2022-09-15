import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { TypeORMConfig } from './ormconfig';

export class DbLibModule {
  static forRoot(entities: EntityClassOrSchema[] = []): DynamicModule {
    return {
      module: this,
      imports: [
        TypeOrmModule.forRoot(TypeORMConfig),
        TypeOrmModule.forFeature(entities),
      ],
      exports: [TypeOrmModule],
    };
  }
}
