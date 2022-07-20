import { Module } from '@nestjs/common';
import { WebsocketLibModule } from '@libs/websocket';
import { AuthLibModule } from '@libs/auth';
import { DbBaseLibModule } from '@libs/db';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [
    GeneralModule,

    AuthLibModule,
    DbBaseLibModule,
    WebsocketLibModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule { }
