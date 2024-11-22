import { Request } from 'express';
import { IUser } from '../user';

export interface IRequestWithUser extends Request {
  user: IUser;
}
