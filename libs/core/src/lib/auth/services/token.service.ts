import { JWT_KEYS, Sub } from '../common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import {
  IProfileConfigService,
  InjectProfileConfigService,
} from '../../profile';

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

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(
    @InjectProfileConfigService()
    protected readonly config: IProfileConfigService,
    protected readonly jwtService: JwtService
  ) {}

  private options(): JwtSignOptions {
    return {
      secret: this.config.getOrThrow(JWT_KEYS.SECRET),
      expiresIn: this.config.getOrThrow(JWT_KEYS.EXPIRE_IN),
    };
  }

  async sign(payload: Sub): Promise<string> {
    return await this.jwtService.signAsync(payload, { ...this.options() });
  }

  async verify(token: string): Promise<Sub> {
    return await this.jwtService.verifyAsync(token, { ...this.options() });
  }
}
