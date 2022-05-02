import { Injectable, BadRequestException, UnauthorizedException, NotFoundException, Inject } from '@nestjs/common';

import { JWT } from 'config';
import { JwtService } from '@nestjs/jwt';
import {
  ERRORS,
  INJECT_TOKENS,
  USER_ROLE,
} from '@libs/constants';
import { compare, getHashByPassword, hashValue } from '../helpers';
import { JwtPayload, UserDTO } from '../dtos';
import { IAuthRepository } from '../interfaces';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    @Inject(INJECT_TOKENS.REPOSITORIES.AUTH_REPOSITORY) private readonly authRepository: IAuthRepository,
  ) {
  }

  public getMe(id: number): Promise<UserDTO> {
    return this.getUserOrFail({ id });
  }

  public generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, { secret: JWT.ACCESS_TOKEN_SECRET_KEY, expiresIn: JWT.ACCESS_TOKEN_EXPIRATION });
  }

  public generateRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, { secret: JWT.REFRESH_TOKEN_SECRET_KEY, expiresIn: JWT.REFRESH_TOKEN_EXPIRATION });
  }

  public async getUserIfRefreshTokenMatches(refreshToken: string, id: number): Promise<UserDTO | null> {
    const user = await this.getUserOrFail({ id });

    const isRefreshTokenMatching = await compare(refreshToken, user.refreshToken);

    if (!isRefreshTokenMatching) {
      return null;
    }
    return user;
  }

  public removeRefreshToken(id: number): Promise<any> {
    return this.authRepository.update(id, {
      refreshToken: null,
    });
  }

  public async saveUserRefreshToken(refreshToken: string, userId: number): Promise<void> {
    const hashedToken = await hashValue(refreshToken, 10);
    await this.authRepository.update({ id: userId }, {
      refreshToken: hashedToken,
    });
  }

  public async signIn(login: string, password: string): Promise<UserDTO> {
    const user = await this.getUserOrFail({ login });

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException([{ field: 'password', message: ERRORS.INVALID_PASSWORD }]);
    }

    return user;
  }

  public async signUp(login: string, password: string): Promise<void> {
    const userByLogin = await this.authRepository.getUser({ login });
    if (userByLogin) {
      throw new BadRequestException([{ field: 'login', message: ERRORS.LOGIN_ALREADY_IN_USE }]);
    }
    const passwordHash = await getHashByPassword(password);
    await this.authRepository.save({
      login,
      role: USER_ROLE.USER,
      password: passwordHash,
    });
  }

  private async getUserOrFail(conditions: Partial<UserDTO>, relations: string[] = []): Promise<UserDTO> {
    const user = await this.authRepository.getUser(conditions, relations);
    if (!user) {
      throw new NotFoundException([{ field: '', message: ERRORS.USER_NOT_FOUND }]);
    }
    return user;
  }

}
