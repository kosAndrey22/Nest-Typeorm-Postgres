import { Injectable } from '@nestjs/common';
import { EventsGateway } from '@libs/websocket';

@Injectable()
export class GeneralService {
  constructor(
    private readonly eventsGateway: EventsGateway,
  ) {
  }

  helloWorld(): string {
    this.eventsGateway.hello();
    return 'hello world';
  }
}
