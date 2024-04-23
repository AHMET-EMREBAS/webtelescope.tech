import { Some } from '@webpackages/common';
import { IAuthUser } from './user';

export interface IAuthUserService {
  findByUsername(username: string): Promise<Some<IAuthUser>>;
  findById(id: number): Promise<Some<IAuthUser>>;
}
