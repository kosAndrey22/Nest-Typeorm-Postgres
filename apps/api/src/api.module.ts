import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketModule } from '@libs/websocket';
import { AuthModule } from '@libs/auth';
import ormconfig from '../../../ormconfig';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    GeneralModule,

    AuthModule,
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule { }
