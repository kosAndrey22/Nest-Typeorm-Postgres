import { Module } from '@nestjs/common';
import { AuthLibModule } from '@libs/auth';
import { DbBaseLibModule } from '@libs/db';
import { GeneralModule } from './general/general.module';
import { WebsocketModule } from './websocket';

@Module({
  imports: [GeneralModule, AuthLibModule, DbBaseLibModule, WebsocketModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
