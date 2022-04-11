import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JWT } from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { COOKIE, INJECT_TOKENS } from '@libs/constants';
import { IUsersRepository } from '@libs/interfaces';
import { JwtPayload } from '../dtos/jwt.payload.dto';
import { ACCESS_TOKEN_STRATEGY } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_STRATEGY,
) {
  constructor(
    @Inject(INJECT_TOKENS.REPOSITORIES.USERS_REPOSITORY) private readonly usersRepository: IUsersRepository,
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
    const user = await this.usersRepository.findOne({ id: payload?.id });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.id,
      role: payload.role,
    };
  }
}
