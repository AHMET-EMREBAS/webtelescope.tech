import { Sub } from '../common';
import { Injectable } from '@nestjs/common';

export interface ITokenService<T extends Sub = Sub> {
  sign(payload: T): Promise<string>;
  verify(token: string): Promise<T>;
}

@Injectable()
export class TestTokenService implements ITokenService {
  async sign(payload: Sub): Promise<string> {
    return JSON.stringify(payload);
  }
  async verify(token: string): Promise<Sub> {
    return JSON.parse(token);
  }
}
