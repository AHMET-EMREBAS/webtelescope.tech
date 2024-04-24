import { ConfigProfile, IConfigService } from '@webpackages/config';

export function seedAppMessages(config: IConfigService) {
  config.set(ConfigProfile.LOCALE, 'EN');

  const enMessages = {
    HELLO: 'Hello: there!',
    [ConfigProfile.MAINTANANCE]: 'Under Construction',
    [ConfigProfile.TEST]: 'Sytem is under production test',
    [ConfigProfile.SLOW]:
      'Profile is set to slow-mode for possible security risks.',
  };

  config.setMessages(enMessages);

  config.set(ConfigProfile.LOCALE, 'TR');

  const trMessages = {
    HELLO: 'Merhaba',
    [ConfigProfile.MAINTANANCE]: 'Yapim asamasinda',
    [ConfigProfile.TEST]: 'Urun test ediliyor',
    [ConfigProfile.SLOW]: 'Yavas profile active edildi.',
  };

  config.setMessages(trMessages);
}
