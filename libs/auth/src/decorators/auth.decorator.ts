import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { COOKIE, USER_ROLE } from '@libs/constants';
import { RolesGuard, JwtAuthGuard } from '../guards';

export function Auth(...roles: USER_ROLE[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiCookieAuth(COOKIE.ACCESS_TOKEN),
    ApiBearerAuth(COOKIE.ACCESS_TOKEN),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
