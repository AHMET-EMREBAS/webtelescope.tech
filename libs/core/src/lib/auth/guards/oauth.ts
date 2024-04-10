import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OAuth } from '@webpackages/entity';
import { getRequiredScope } from '../policy';
import { Reflector } from '@nestjs/core';

@Injectable()
export class OAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
    @InjectRepository(OAuth) private readonly oauthRepo: Repository<OAuth>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const orgName = this.authService.extractOrganizationNameFromHeader(context);
    if (orgName == 'main' || orgName == 'root') {
      return true;
    }

    const apiKey = this.authService.extractOAuthApiKeyFromHeader(context);
    const oauth = await this.oauthRepo.findOneBy({ apiKey });

    const scope = getRequiredScope(this.reflector, context);

    if (oauth) {
      if (oauth.scopes.find((e) => e.scope === scope)) {
        return true;
      }
    }

    return false;
  }
}
