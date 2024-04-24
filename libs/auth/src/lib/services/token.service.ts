import {
  IProfileConfigService,
  ITokenService,
  InjectProfileConfigService,
  Injectable,
  JWT_KEYS,
  JwtService,
  JwtSignOptions,
  Sub,
} from '@webpackages/core';

@Injectable()
export class TokenService implements ITokenService {
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
