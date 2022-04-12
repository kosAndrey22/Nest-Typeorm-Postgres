import { Module } from '@nestjs/common';
import { WebsocketLibModule } from '@libs/websocket';
import { AuthLibModule } from '@libs/auth';
import { DbLibModule } from '@libs/db';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [
    GeneralModule,

    AuthLibModule,
    DbLibModule,
    WebsocketLibModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule { }
