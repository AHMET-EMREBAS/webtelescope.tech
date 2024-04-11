import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JtwOptionsFactory implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService) {}
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      global: true,
      secret: this.config.getOrThrow('JWT_SECRET'),
      signOptions: {
        expiresIn: this.config.getOrThrow('JWT_EXPIRES_IN'),
      },
    };
  }
}
