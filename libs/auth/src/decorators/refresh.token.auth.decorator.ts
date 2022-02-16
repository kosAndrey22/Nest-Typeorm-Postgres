import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { COOKIE } from '@libs/constants';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';

export function RefreshTokenAuthDecorator(): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void {
  return applyDecorators(
    UseGuards(JwtRefreshGuard),
    ApiCookieAuth(COOKIE.REFRESH_TOKEN),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
