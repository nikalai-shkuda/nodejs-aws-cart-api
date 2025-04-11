import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';

export interface AppRequest extends Request {
  user?: UserEntity;
}
