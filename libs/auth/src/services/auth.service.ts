import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';

import { JWT } from 'config';
import { JwtService } from '@nestjs/jwt';
import { UpdateResult } from 'typeorm';
import { UserEntity } from '@libs/entities';
import {
  ERRORS,
  USER_ROLE,
} from '@libs/constants';
import { UsersRepository } from '@libs/repositories';
import { compare, getHashByPassword, hashValue } from '../helpers/crypto.helper';
import { JwtPayload } from '../dtos/jwt.payload.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {
  }

  public getMe(id: number): Promise<UserEntity> {
    return this.getUserOrFail({ id });
  }

  public generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, { secret: JWT.ACCESS_TOKEN_SECRET_KEY, expiresIn: JWT.ACCESS_TOKEN_EXPIRATION });
  }

  public generateRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, { secret: JWT.REFRESH_TOKEN_SECRET_KEY, expiresIn: JWT.REFRESH_TOKEN_EXPIRATION });
  }

  public async getUserIfRefreshTokenMatches(refreshToken: string, id: number): Promise<UserEntity | null> {
    const user = await this.getUserOrFail({ id });

    const isRefreshTokenMatching = await compare(refreshToken, user.refreshToken);

    if (!isRefreshTokenMatching) {
      return null;
    }
    return user;
  }

  public removeRefreshToken(id: number): Promise<UpdateResult> {
    return this.usersRepository.update(id, {
      refreshToken: null,
    });
  }

  public async saveUserRefreshToken(refreshToken: string, userId: number): Promise<void> {
    const hashedToken = await hashValue(refreshToken, 10);
    await this.usersRepository.update({ id: userId }, {
      refreshToken: hashedToken,
    });
  }

  public async signIn(login: string, password: string): Promise<UserEntity> {
    const user = await this.getUserOrFail({ login });

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException([{ field: 'password', message: ERRORS.INVALID_PASSWORD }]);
    }

    return user;
  }

  public async signUp(login: string, password: string): Promise<void> {
    const userByLogin = await this.usersRepository.getUser({ login });
    if (userByLogin) {
      throw new BadRequestException([{ field: 'login', message: ERRORS.LOGIN_ALREADY_IN_USE }]);
    }
    const passwordHash = await getHashByPassword(password);
    await this.usersRepository.save({
      login,
      role: USER_ROLE.USER,
      password: passwordHash,
    });
  }

  private async getUserOrFail(conditions: Partial<UserEntity>, relations: string[] = []): Promise<UserEntity> {
    const user = await this.usersRepository.getUser(conditions, relations);
    if (!user) {
      throw new NotFoundException([{ field: '', message: ERRORS.USER_NOT_FOUND }]);
    }
    return user;
  }

}
