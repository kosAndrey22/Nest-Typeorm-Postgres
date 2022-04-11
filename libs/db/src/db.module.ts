import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INJECT_TOKENS } from '@libs/constants';

import { UserEntity } from './entities';
import { TypeORMConfig } from './ormconfig';
import { UsersRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeORMConfig),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [{
    provide: INJECT_TOKENS.REPOSITORIES.USERS_REPOSITORY,
    useClass: UsersRepository,
  }],
  exports: [
    INJECT_TOKENS.REPOSITORIES.USERS_REPOSITORY,
  ],
})
export class DbModule { }
