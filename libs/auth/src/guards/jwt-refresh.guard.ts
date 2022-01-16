import { AuthGuard } from '@nestjs/passport';
import { REFRESH_TOKEN_STRATEGY } from '../constants';

export class JwtRefreshGuard extends AuthGuard(REFRESH_TOKEN_STRATEGY) { }
