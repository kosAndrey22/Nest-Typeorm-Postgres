import { USER_ROLE } from '@libs/constants';

export class JwtPayload {
  id: number;
  role: USER_ROLE;
}
