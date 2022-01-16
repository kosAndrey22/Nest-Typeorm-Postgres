import { AuthGuard } from '@nestjs/passport';
import { ACCESS_TOKEN_STRATEGY } from '../constants';

export class JwtAuthGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY) { }
