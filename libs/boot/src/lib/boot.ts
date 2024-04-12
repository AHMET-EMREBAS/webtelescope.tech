import { Logger, NestApplicationOptions, Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClassConstructor } from 'class-transformer';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AuthEnums, ConfigKeyFactory } from '@webpackages/common';

import favicon = require('serve-favicon');

export type BootstrapOptions = {
  appModule: ClassConstructor<unknown>;
  port: number;
  appName: string;
  appShortName: string;
  appDescription: string;
  website: string;
  host: string;
  email: string;
  https?: boolean;
  globalPrefix?: string;
};

export function createHttpsConfiguration(): NestApplicationOptions {
  return {
    httpsOptions: {
      cert: readFileSync(join(__dirname, 'cert.pem')),
      key: readFileSync(join(__dirname, 'key.pem')),
    },
  };
}
export async function bootNestApplication(appModule: Type, appName: string) {
  const createApp = async (https = false) =>
    await NestFactory.create(
      appModule,
      https ? createHttpsConfiguration() : undefined
    );

  const context = await createApp();
  const config = context.get(ConfigService);
  const cf = new ConfigKeyFactory(appName);

  const HTTPS = config.getOrThrow(cf.key('HTTPS'));
  const GLOBAL_PREFIX = config.getOrThrow(cf.key('API_GLOBAL_PREFIX'));
  const NAME = config.getOrThrow(cf.key('NAME'));
  const DESCRIPTION = config.getOrThrow(cf.key('DESCRIPTION'));
  const EMAIL = config.getOrThrow(cf.key('EMAIL'));
  const URL = config.getOrThrow(cf.key('URL'));
  const HOST = config.getOrThrow(cf.key('HOST'));
  const PORT = config.getOrThrow(cf.key('PORT'));

  const app = await createApp(HTTPS === 'true');

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.use(helmet());
  app.enableCors({ origin: '*' });

  app.use(favicon(join(__dirname, 'public', 'favicon.ico')));

  const swaggerConfig = new DocumentBuilder()
    .setTitle(NAME)
    .setDescription(DESCRIPTION)
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      name: AuthEnums.BEARER,
    })
    .addGlobalParameters({
      in: 'header',
      name: AuthEnums.X_OAUTH_API_KEY,
      description: 'OAuth api key',
    })
    .addGlobalParameters({
      in: 'header',
      name: AuthEnums.X_ORGNAME,
      description: 'Organization name',
      example: 'main',
    })

    .setContact('Contact', URL, EMAIL)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    customfavIcon: './favicon.ico',
    customSiteTitle: NAME,
    explorer: true,
    yamlDocumentUrl: 'api-yaml',
    jsonDocumentUrl: 'api-json',
  });

  await app.listen(PORT);
  Logger.log(
    `🚀 ${NAME} application is running on: http://${HOST}:${PORT}/${GLOBAL_PREFIX}`
  );
}
