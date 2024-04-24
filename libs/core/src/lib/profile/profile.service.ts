import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Profile } from './profiles';

export interface IProfileService {
  profile(): string;
  setProfile(profile: string): void;
}

@Injectable()
export class TestProfileService implements IProfileService {
  private testProfile = 'test-profile';
  profile(): string {
    return this.testProfile;
  }

  setProfile(profile: string): void {
    this.testProfile = profile;
  }
}

@Injectable()
export class ProfileService implements IProfileService {
  constructor(private readonly config: ConfigService) {}

  profile(): string {
    return this.config.getOrThrow(Profile.PROFILE);
  }

  setProfile(profile: string): void {
    this.config.set(Profile.PROFILE, profile);
  }
}
