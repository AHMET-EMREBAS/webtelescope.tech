import { Logger, Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClassConstructor } from 'class-transformer';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AuthEnums } from '@webpackages/common';

import favicon = require('serve-favicon');

export type BootstrapOptions = {
  appModule: ClassConstructor<unknown>;
  port: number;
  appName: string;
  appDescription: string;
  website: string;
  host: string;
  email: string;
  https?: boolean;
  globalPrefix?: string;
};

export async function bootNestApplication(appModule: Type) {
  const app =
    process.env['HTTPS'] === 'true'
      ? await NestFactory.create(appModule, {
          httpsOptions: {
            cert: readFileSync(join(__dirname, 'cert.pem')),
            key: readFileSync(join(__dirname, 'key.pem')),
          },
        })
      : await NestFactory.create(appModule);

  const config = app.get(ConfigService);

  const GLOBAL_PREFIX = config.getOrThrow('API_GLOBAL_PREFIX');
  const APP_NAME = config.getOrThrow('APP_NAME');
  const APP_DESCRIPTION = config.getOrThrow('APP_DESCRIPTION');
  const EMAIL = config.getOrThrow('EMAIL');
  const URL = config.getOrThrow('URL');
  const HOST = config.getOrThrow('HOST');
  const PORT = config.getOrThrow('PORT');

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.use(helmet());
  app.enableCors({ origin: '*' });

  app.use(favicon(join(__dirname, 'public', 'favicon.ico')));

  const swaggerConfig = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
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
    customSiteTitle: APP_NAME,
    explorer: true,
    yamlDocumentUrl: 'api-yaml',
    jsonDocumentUrl: 'api-json',
  });

  await app.listen(PORT);
  Logger.log(
    `🚀 ${APP_NAME} application is running on: http://${HOST}:${PORT}/${GLOBAL_PREFIX}`
  );
}
