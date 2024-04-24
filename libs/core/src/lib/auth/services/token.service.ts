import { ConfigService } from '@nestjs/config';
import { Sub } from '../common';
import { JwtService } from '@nestjs/jwt';

export interface ITokenService<T extends Sub = Sub> {
  sign(payload: T): Promise<string>;
  verify(token: string): Promise<T>;
}

export class TestTokenService implements ITokenService {
  async sign(payload: Sub): Promise<string> {
    return JSON.stringify(payload);
  }
  async verify(token: string): Promise<Sub> {
    return JSON.parse(token);
  }
}

export class JwtTokenService extends JwtService {
  constructor(config: ConfigService) {
    super({
      secret: config.getOrThrow('SECRET'),
      signOptions: {
        expiresIn: config.getOrThrow('TOKEN_EXPIRATION'),
      },
    });
  }
}
