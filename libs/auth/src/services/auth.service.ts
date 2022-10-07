import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JWT } from 'config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS, USER_ROLE } from '@libs/constants';
import { IUserEntity } from '@libs/interfaces';
import { User } from '@libs/value-objects';
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

    const isRefreshTokenMatching = await User.compareRefreshTokens(
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
    const hashedToken = await User.getHashedRefreshToken(refreshToken);
    await this.authRepository.update(
      { id: userId },
      {
        refreshToken: hashedToken,
      },
    );
  }

  public async signIn(login: string, password: string): Promise<IUserEntity> {
    const user = await this.getUserOrFail({ login });

    const passwordCorrect = await User.comparePassword(password, user.password);
    if (!passwordCorrect) {
      throw new UnauthorizedException([
        { field: 'password', message: ERRORS.INVALID_PASSWORD },
      ]);
    }

    return user;
  }

  public async signUp(login: string, password: string): Promise<void> {
    const userByLogin = await this.authRepository.getUser({ login });
    if (userByLogin) {
      throw new BadRequestException([
        { field: 'login', message: ERRORS.LOGIN_ALREADY_IN_USE },
      ]);
    }
    const passwordValid = User.validatePassword(password);
    if (!passwordValid) {
      throw new BadRequestException([
        { field: 'password', message: ERRORS.INVALID_PASSWORD },
      ]);
    }
    const passwordHash = await User.getHashedPassword(password);
    await this.authRepository.save({
      login,
      role: USER_ROLE.USER,
      password: passwordHash,
    });
  }

  private async getUserOrFail(
    conditions: Partial<IUserEntity>,
    relations: string[] = [],
  ): Promise<IUserEntity> {
    const user = await this.authRepository.getUser(conditions, relations);
    if (!user) {
      throw new NotFoundException([
        { field: '', message: ERRORS.USER_NOT_FOUND },
      ]);
    }
    return user;
  }
}
