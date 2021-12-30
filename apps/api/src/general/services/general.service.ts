import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories';

@Injectable()
export class GeneralService {
  constructor(private readonly usersRepository: UsersRepository) {
  }

  helloWorld(): string {
    return 'hello world';
  }
}
