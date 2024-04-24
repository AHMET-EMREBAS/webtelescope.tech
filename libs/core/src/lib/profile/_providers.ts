import { createClassProvider } from '../common';

export const [
  provideProfileService,
  InjectProfileService,
  getProfileServiceToken,
] = createClassProvider('ProfileService');

export const [
  provideProfileConfigService,
  InjectProfileConfigService,
  getProfileConfigServiceToken,
] = createClassProvider('ProfileConfigService');
