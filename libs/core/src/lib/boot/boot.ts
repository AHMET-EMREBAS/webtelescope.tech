import {
  INestApplication,
  Logger,
  NestApplicationOptions,
  Type,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '../swagger';
import { AuthNames } from '../auth';

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
    .addBearerAuth({
      type: 'apiKey',
      in: 'headers',
      description: 'Api-key is created for every user on successful login.',
      name: AuthNames.API_KEY_SECURITY_NAME,
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

export async function boot(module: Type, profileName: string) {
  const profile = profileName.toUpperCase();

  const context = await NestFactory.create(module);
  const config = context.get(ConfigService);

  const _cn = (key: string) => `${profile}_${key}`;
  const _cf = <T extends string = string>(key: string) =>
    config.getOrThrow<T>(_cn(key));

  const MODE = config.getOrThrow('NODE_ENV');
  const NAME = _cf('NAME');
  const PREFIX = _cf('PREFIX');
  const ORIGINS = _cf('ORIGINS');
  const PORT = _cf('PORT');
  const HTTPS = _cf('HTTPS');
  const DOMAIN = _cf('DOMAIN');

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
