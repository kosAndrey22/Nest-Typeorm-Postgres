import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLibService } from '@libs/auth';
import { UserEntity } from '@libs/db';
import { JwtPayload } from '@libs/auth/dtos';
import { ERRORS } from '@libs/constants';

@Injectable()
export class AuthService {
  constructor(private readonly authLibService: AuthLibService) {}

  public async getMeOrFail(id: number): Promise<UserEntity> {
    try {
      const me = await this.getMe(id);
      return me;
    } catch (e) {
      this.parseAuthLibError(e);
    }
  }

  private getMe(id: number): Promise<UserEntity> {
    return this.authLibService.getMe(id);
  }

  public async signUpOrFail(login: string, password: string): Promise<void> {
    try {
      const signUpResult = await this.signUp(login, password);
      return signUpResult;
    } catch (e) {
      this.parseAuthLibError(e);
    }
  }

  private signUp(login: string, password: string): Promise<void> {
    return this.authLibService.signUp(login, password);
  }

  public async signInOrFail(
    login: string,
    password: string,
  ): Promise<UserEntity> {
    try {
      const signInResult = await this.signIn(login, password);
      return signInResult;
    } catch (e) {
      this.parseAuthLibError(e);
    }
  }

  private signIn(login: string, password: string): Promise<UserEntity> {
    return this.authLibService.signIn(login, password);
  }

  public generateAccessToken(payload: JwtPayload): string {
    return this.authLibService.generateAccessToken(payload);
  }

  public generateRefreshToken(payload: JwtPayload): string {
    return this.authLibService.generateRefreshToken(payload);
  }

  public saveUserRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<void> {
    return this.authLibService.saveUserRefreshToken(refreshToken, userId);
  }

  public removeRefreshToken(userId: number): Promise<void> {
    return this.authLibService.removeRefreshToken(userId);
  }

  private parseAuthLibError(e: Error): void {
    switch (e.message) {
    case ERRORS.INVALID_PASSWORD:
      throw new BadRequestException([
        { field: 'password', message: ERRORS.INVALID_PASSWORD },
      ]);
    case ERRORS.INCORRECT_PASSWORD:
      throw new UnauthorizedException([
        { field: 'password', message: ERRORS.INVALID_PASSWORD },
      ]);
    case ERRORS.LOGIN_ALREADY_IN_USE:
      throw new BadRequestException([
        { field: 'login', message: ERRORS.LOGIN_ALREADY_IN_USE },
      ]);
    case ERRORS.USER_NOT_FOUND:
      throw new NotFoundException([
        { field: 'login', message: ERRORS.USER_NOT_FOUND },
      ]);
    default:
      throw new InternalServerErrorException([
        { field: '', message: ERRORS.INTERNAL_SERVER_ERROR },
      ]);
    }
  }
}
