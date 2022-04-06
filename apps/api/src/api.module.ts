import { Module } from '@nestjs/common';
import { WebsocketModule } from '@libs/websocket';
import { AuthModule } from '@libs/auth';
import { DbModule } from '@libs/db';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [
    GeneralModule,

    AuthModule,
    DbModule,
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule { }
