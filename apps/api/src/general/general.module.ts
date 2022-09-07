import { Module } from '@nestjs/common';
import { WebsocketModule } from '../websocket';
import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [WebsocketModule],
  controllers: Object.values(Controllers),
  providers: Object.values(Services),
})
export class GeneralModule {}
