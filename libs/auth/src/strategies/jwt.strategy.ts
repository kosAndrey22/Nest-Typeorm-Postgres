import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JWT } from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { COOKIE } from '@libs/constants';
import { JwtPayload } from '../dtos';
import { ACCESS_TOKEN_STRATEGY } from '../constants';
import { IAuthRepository } from '../interfaces';
import { AuthRepository } from '../repositories';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_STRATEGY,
) {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          if (req) {
            if (req.cookies && req.cookies[COOKIE.ACCESS_TOKEN]) {
              return req.cookies[COOKIE.ACCESS_TOKEN];
            }

            const tokenHeaderRaw = req.header(COOKIE.ACCESS_TOKEN);
            if (tokenHeaderRaw) {
              return tokenHeaderRaw.replace('Bearer ', '');
            }
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT.ACCESS_TOKEN_SECRET_KEY,
    });
  }

  public async validate(payload: JwtPayload): Promise<JwtPayload> {
    const user = await this.authRepository.findOne({ id: payload?.id });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.id,
      role: payload.role,
    };
  }
}
