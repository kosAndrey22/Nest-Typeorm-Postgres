import { Module } from '@nestjs/common';
import { DatabaseModule, UserEntity } from '@libs/db';
import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [DatabaseModule.forRoot([UserEntity])],
  controllers: Object.values(Controllers),
  providers: Object.values(Services),
})
export class HelloModule {}
