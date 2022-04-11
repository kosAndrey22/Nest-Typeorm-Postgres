import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities';
import { TypeORMConfig } from './ormconfig';
import { UsersRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeORMConfig),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    UsersRepository,
  ],
  exports: [
    UsersRepository,
  ],
})
export class DbModule { }
