import {
  INestApplication,
  Logger,
  NestApplicationOptions,
  Type,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '../swagger';
import { AuthNames } from '../auth';
import {
  IProfileConfigService,
  getProfileConfigServiceToken,
} from '../profile';

export type SwaggerOptions = {
  title: string;
  prefix?: string;
};
export function configureSwagger(
  app: INestApplication,
  options: SwaggerOptions
) {
  const { title, prefix } = options;
  const swaggerConfig = new DocumentBuilder()
    .setTitle(title)
    .addApiKey({
      type: 'apiKey',
      in: 'headers',
      'x-tokenName': AuthNames.OAUTH2_KEY,
      name: AuthNames.OAUTH2_NAME,
    })
    .addBearerAuth({
      type: 'http',
      in: 'headers',
      description: 'Api-key is created for every user on successful login.',
      name: AuthNames.BEARER_SECURITY_NAME,
    })
    .addCookieAuth(AuthNames.ACCESS_TOKEN_COOKIE_KEY, {
      type: 'http',
      name: AuthNames.COOKIE_SECURITY_NAME,
    })
    .addBasicAuth({
      type: 'http',
      in: 'body',
      name: AuthNames.CREDENTIALS_SECURITY_NAME,
    })
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(prefix ?? 'api', app, doc);
}

export async function boot(module: Type) {
  const context = await NestFactory.create(module);
  const configService = context.get<IProfileConfigService>(
    getProfileConfigServiceToken()
  );

  const _cs = (key: string) => configService.getOrThrow(key);

  const MODE = process.env['NODE_ENV'];
  const NAME = _cs('NAME');
  const PREFIX = _cs('PREFIX');
  const ORIGINS = _cs('ORIGINS');
  const PORT = _cs('PORT');
  const HTTPS = _cs('HTTPS');
  const DOMAIN = _cs('DOMAIN');

  console.table({
    MODE,
    NAME,
    PREFIX,
    ORIGINS,
    PORT,
    HTTPS,
    DOMAIN,
  });

  const HTTPS_OPTIONS: NestApplicationOptions = {
    httpsOptions: { cert: './cert.pom', key: './key.pom' },
  };
  const NONE_HTTPS_OPTIONS: NestApplicationOptions = {};
  const APP_OPTIONS = HTTPS == 'true' ? HTTPS_OPTIONS : NONE_HTTPS_OPTIONS;

  const app: INestApplication = await NestFactory.create(module, APP_OPTIONS);
  app.setGlobalPrefix(PREFIX ?? 'api');
  app.enableCors({ origin: ORIGINS ?? '*' });
  app.use(helmet());

  configureSwagger(app, { title: NAME, prefix: PREFIX });

  await app.listen(3000, () => {
    Logger.log(
      `[${MODE}] ${NAME ?? 'App'} is up and running on (${DOMAIN}:${PORT})`
    );
  });
}
