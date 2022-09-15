import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'config';
import { DbLibModule } from '@libs/db';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import * as Services from './services';
import { AuthRepository } from './repositories';
import { AuthLibService } from './services';

@Module({
  imports: [
    DbLibModule.forRoot([AuthRepository]),
    JwtModule.register({
      secret: JWT.ACCESS_TOKEN_SECRET_KEY,
    }),
  ],
  providers: [...Object.values(Services), JwtStrategy, JwtRefreshStrategy],
  exports: [JwtStrategy, JwtRefreshStrategy, AuthLibService],
})
export class AuthLibModule {}
