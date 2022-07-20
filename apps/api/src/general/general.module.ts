import { Module } from '@nestjs/common';
import { WebsocketLibModule } from '@libs/websocket';
import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [
    WebsocketLibModule,
  ],
  controllers: Object.values(Controllers),
  providers: Object.values(Services),
})
export class GeneralModule { }
