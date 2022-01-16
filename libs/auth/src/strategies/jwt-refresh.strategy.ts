import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT } from 'config';
import { Request } from 'express';
import { JwtPayload } from '../dtos/jwt.payload.dto';
import { AuthService } from '../services';
import { REFRESH_TOKEN_STRATEGY } from '../constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  REFRESH_TOKEN_STRATEGY,
) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request): string => {
        return request?.cookies?.Refresh;
      }]),
      secretOrKey: JWT.REFRESH_TOKEN_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  public async validate(request: Request, payload: JwtPayload): Promise<JwtPayload> {
    const refreshToken = request.cookies?.Refresh;
    await this.authService.getUserIfRefreshTokenMatches(refreshToken, payload.id);
    return {
      id: payload.id,
      role: payload.role,
    };
  }

}
