import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'config';
import { DbBaseLibModule } from '@libs/db';
import { INJECT_TOKENS } from '@libs/constants';
import { UserEntity } from '@libs/entities';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import * as Controllers from './controllers';
import * as Services from './services';
import { AuthRepository } from './repositories';

@Module({
  imports: [
    DbBaseLibModule.forRoot([UserEntity]),
    JwtModule.register({
      secret: JWT.ACCESS_TOKEN_SECRET_KEY,
    }),
  ],
  controllers: Object.values(Controllers),
  providers: [
    ...Object.values(Services),
    JwtStrategy,
    JwtRefreshStrategy,
    {
      provide: INJECT_TOKENS.REPOSITORIES.AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
  ],
  exports: [
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthLibModule {
}
