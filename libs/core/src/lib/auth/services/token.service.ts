import { Sub } from '../common';

export interface ITokenService<T extends Sub = Sub> {
  sign(payload: T): Promise<string>;
  verify(token: string): Promise<T>;
}
