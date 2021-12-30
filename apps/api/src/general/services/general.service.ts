import { Injectable } from '@nestjs/common';
import { ExampleRepository } from '../repositories';

@Injectable()
export class GeneralService {
  constructor(private readonly exampleRepository: ExampleRepository) {
  }

  helloWorld(): string {
    return 'hello world';
  }
}
