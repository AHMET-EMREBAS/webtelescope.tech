import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OAuth } from '@webpackages/entity';

@Injectable()
export class OAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(OAuth) private readonly oauthRepo: Repository<OAuth>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const orgName = this.authService.extractOrganizationNameFromHeader(context);
    if (orgName == 'main' || orgName == 'root') {
      return true;
    }

    const apiKey = this.authService.extractOAuthApiKeyFromHeader(context);
    const oauth = await this.oauthRepo.findOneBy({ apiKey });

    if (oauth) {
      if (oauth.organization.organizationName == orgName) {
        return true;
      }
      oauth.scope;
    }
    return false;
  }
}
