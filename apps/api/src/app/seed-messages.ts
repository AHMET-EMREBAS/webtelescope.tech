import { IProfileConfigService, Profile } from '@webpackages/core';

export function seedAppMessages(config: IProfileConfigService) {
  config.set(Profile.LOCALE, 'EN');

  const enMessages = {
    HELLO: 'Hello: there!',
    [Profile.MAINTANANCE]: 'Under Construction',
    [Profile.TEST]: 'Sytem is under production test',
    [Profile.SLOW]: 'Profile is set to slow-mode for possible security risks.',
  };

  config.setMessages(enMessages);

  config.set(Profile.LOCALE, 'TR');

  const trMessages = {
    HELLO: 'Merhaba',
    [Profile.MAINTANANCE]: 'Yapim asamasinda',
    [Profile.TEST]: 'Urun test ediliyor',
    [Profile.SLOW]: 'Yavas profile active edildi.',
  };

  config.setMessages(trMessages);
}
