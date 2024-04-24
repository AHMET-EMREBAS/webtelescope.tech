import { Module } from '@nestjs/common';
import {
  getProfileConfigServiceToken,
  getProfileServiceToken,
  provideProfileConfigService,
  provideProfileService,
} from './_providers';
import { ProfileConfigService } from './config.service';
import { ProfileService } from './profile.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    provideProfileConfigService(ProfileConfigService),
    provideProfileService(ProfileService),
  ],
  exports: [getProfileConfigServiceToken(), getProfileServiceToken()],
})
export class ProfileModule {}
