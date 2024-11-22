import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@libs/db';

@Injectable()
export class HelloService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async helloWorld(): Promise<string> {
    const usersCount = await this.usersRepository.count();
    return `Hello world! Total users count: ${usersCount}`;
  }
}
