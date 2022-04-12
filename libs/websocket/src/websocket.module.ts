import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  controllers: [],
  exports: [
    EventsGateway,
  ],
  imports: [],
  providers: [
    EventsGateway,
  ],
})
export class WebsocketLibModule { }
