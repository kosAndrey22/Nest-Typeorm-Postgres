import { Injectable } from '@nestjs/common';
import { JWT } from 'config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ERRORS,
  PASSWORD_SALT_ROUNDS,
  REFRESH_TOKEN_SALT_ROUNDS,
  USER_ROLE,
} from '@libs/constants';
import { IUserEntity } from '@libs/interfaces';
import { UserValidator } from '@libs/validators';
import { compareValues, hashValue } from '@libs/helpers';
import { JwtPayload } from '../dtos';
import { IAuthRepository } from '../interfaces';
import { AuthRepository } from '../repositories';

@Injectable()
export class AuthLibService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  public getMe(id: number): Promise<IUserEntity> {
    return this.getUserOrFail({ id });
  }

  public generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: JWT.ACCESS_TOKEN_SECRET_KEY,
      expiresIn: JWT.ACCESS_TOKEN_EXPIRATION,
    });
  }

  public generateRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: JWT.REFRESH_TOKEN_SECRET_KEY,
      expiresIn: JWT.REFRESH_TOKEN_EXPIRATION,
    });
  }

  public async getUserIfRefreshTokenMatches(
    refreshToken: string,
    id: number,
  ): Promise<IUserEntity | null> {
    const user = await this.getUserOrFail({ id });

    const isRefreshTokenMatching = await this.compareRefreshTokens(
      refreshToken,
      user.refreshToken,
    );

    if (!isRefreshTokenMatching) {
      return null;
    }
    return user;
  }

  public async removeRefreshToken(userId: number): Promise<void> {
    await this.authRepository.update(userId, {
      refreshToken: null,
    });
  }

  public async saveUserRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<void> {
    const hashedToken = await this.getHashedRefreshToken(refreshToken);
    await this.authRepository.update(
      { id: userId },
      {
        refreshToken: hashedToken,
      },
    );
  }

  public async signIn(login: string, password: string): Promise<IUserEntity> {
    const user = await this.getUserOrFail({ login });

    const passwordCorrect = await this.comparePassword(password, user.password);
    if (!passwordCorrect) {
      throw new Error(ERRORS.INCORRECT_PASSWORD);
    }
    return user;
  }

  public async signUp(login: string, password: string): Promise<void> {
    const userByLogin = await this.authRepository.getUser({ login });
    if (userByLogin) {
      throw new Error(ERRORS.LOGIN_ALREADY_IN_USE);
    }
    const passwordValid = UserValidator.validatePassword(password);
    if (!passwordValid) {
      throw new Error(ERRORS.INVALID_PASSWORD);
    }
    const passwordHash = await this.getHashedPassword(password);
    await this.authRepository.save({
      login,
      role: USER_ROLE.USER,
      password: passwordHash,
    });
  }

  private comparePassword = (
    password: string,
    passwordHash: string,
  ): Promise<boolean> => {
    return compareValues(password, passwordHash);
  };

  private compareRefreshTokens = (
    token: string,
    tokeHash: string,
  ): Promise<boolean> => {
    return compareValues(token, tokeHash);
  };

  private getHashedPassword = (password: string): Promise<string> => {
    return hashValue(password, PASSWORD_SALT_ROUNDS);
  };

  private getHashedRefreshToken = (token: string): Promise<string> => {
    return hashValue(token, REFRESH_TOKEN_SALT_ROUNDS);
  };

  private async getUserOrFail(
    conditions: Partial<IUserEntity>,
    relations: string[] = [],
  ): Promise<IUserEntity> {
    const user = await this.authRepository.getUser(conditions, relations);
    if (!user) {
      throw new Error(ERRORS.USER_NOT_FOUND);
    }
    return user;
  }
}
