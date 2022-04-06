import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT } from 'config';
import { UsersRepository } from '@libs/repositories';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
    ]),
    JwtModule.register({
      secret: JWT.ACCESS_TOKEN_SECRET_KEY,
    }),
  ],
  controllers: Object.values(Controllers),
  providers: [
    ...Object.values(Services),
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  exports: [
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {
}
