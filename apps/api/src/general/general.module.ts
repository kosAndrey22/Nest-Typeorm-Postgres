import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketModule } from '@libs/websocket';
import * as Controllers from './controllers';
import * as Repositories from './repositories';
import * as Services from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(Repositories)),
    WebsocketModule,
  ],
  controllers: Object.values(Controllers),
  providers: Object.values(Services),
})
export class GeneralModule { }
