import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { key } from '../common';

@Injectable()
export class JtwOptionsFactory implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService) {}
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      global: true,
      secret: this.config.getOrThrow(key('JWT_SECRET')),
      signOptions: {
        expiresIn: this.config.getOrThrow(key('JWT_EXPIRES_IN')),
      },
    };
  }
}
