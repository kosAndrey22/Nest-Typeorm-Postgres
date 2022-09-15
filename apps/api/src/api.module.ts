import { Module } from '@nestjs/common';
import { DbLibModule } from '@libs/db';
import { GeneralModule } from './general/general.module';
import { WebsocketModule } from './websocket';
import { AuthModule } from './auth';

@Module({
  imports: [GeneralModule, AuthModule, WebsocketModule, DbLibModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
