import { Injectable } from '@nestjs/common';
import { EventsGateway } from '@libs/websocket';
import { UserRepository } from '../repositories';

@Injectable()
export class GeneralService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventsGateway: EventsGateway,
  ) {
  }

  helloWorld(): string {
    this.eventsGateway.hello();
    return 'hello world';
  }
}
