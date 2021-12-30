import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Controllers from './controllers';
import * as Repositories from './repositories';
import * as Services from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(Repositories)),
  ],
  controllers: Object.values(Controllers),
  providers: Object.values(Services),
})
export class GeneralModule { }
