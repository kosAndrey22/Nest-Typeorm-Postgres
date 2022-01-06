import { JwtPayload } from './jwt.payload.dto';

export type RequestWithUser = Request & { user: JwtPayload };
