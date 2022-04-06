import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeORMConfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeORMConfig),
  ],
})
export class DbModule { }
