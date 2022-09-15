import { Injectable } from '@nestjs/common';
import { AuthLibService } from '@libs/auth';
import { UserEntity } from '@libs/db';
import { JwtPayload } from '@libs/auth/dtos';

@Injectable()
export class AuthService {
  constructor(private readonly authLibService: AuthLibService) {}

  public getMe(id: number): Promise<UserEntity> {
    return this.authLibService.getMe(id);
  }

  public signUp(login: string, password: string): Promise<void> {
    return this.authLibService.signUp(login, password);
  }

  public signIn(login: string, password: string): Promise<UserEntity> {
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
}
