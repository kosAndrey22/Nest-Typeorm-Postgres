import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT } from 'config';
import { Request } from 'express';
import { COOKIE } from '@libs/constants';
import { JwtPayload } from '../dtos';
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
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          if (req.cookies && req.cookies[COOKIE.REFRESH_TOKEN]) {
            return req.cookies[COOKIE.REFRESH_TOKEN];
          }
          return null;
        },
      ]),
      secretOrKey: JWT.REFRESH_TOKEN_SECRET_KEY,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  public async validate(req: Request, payload: JwtPayload): Promise<JwtPayload> {
    const refreshToken = req.cookies[COOKIE.REFRESH_TOKEN];
    await this.authService.getUserIfRefreshTokenMatches(refreshToken, payload.id);
    return {
      id: payload.id,
      role: payload.role,
    };
  }

}
