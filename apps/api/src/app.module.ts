import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketModule } from '@libs/websocket';
import ormconfig from '../../../ormconfig';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    GeneralModule,
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
