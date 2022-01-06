import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';

import { UserEntity } from '@libs/entities';
import {
  ERRORS,
  USER_ROLE,
} from '@libs/constants';

import { comparePasswords, getHashByPassword } from '../helpers/password.helper';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersRepository: UsersRepository,
  ) {
  }

  public async signUp(login: string, password: string): Promise<void> {
    const userByLogin = await this.usersRepository.getUser({ login });
    if (userByLogin) {
      throw new BadRequestException([{ field: 'email', message: ERRORS.LOGIN_ALREADY_IN_USE }]);
    }
    const passwordHash = await getHashByPassword(password);
    await this.usersRepository.save({
      login,
      role: USER_ROLE.USER,
      password: passwordHash,
    });
  }

  public async signIn(login: string, password: string): Promise<UserEntity> {
    const user = await this.getUserOrFail({ login });

    const isPasswordCorrect = await comparePasswords(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException([{ field: 'password', message: ERRORS.INVALID_PASSWORD }]);
    }

    return user;
  }

  public getMe(id: number): Promise<UserEntity> {
    return this.getUserOrFail({ id });
  }

  private async getUserOrFail(conditions: Partial<UserEntity>, relations: string[] = []): Promise<UserEntity> {
    const user = await this.usersRepository.getUser(conditions, relations);
    if (!user) {
      throw new NotFoundException([{ field: '', message: ERRORS.USER_NOT_FOUND }]);
    }
    return user;
  }

}
