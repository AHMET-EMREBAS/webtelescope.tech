/* eslint-disable @nx/enforce-module-boundaries */
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClassConstructor } from 'class-transformer';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { readFileSync } from 'fs';
import { join } from 'path';

import favicon from 'serve-favicon';
import { AuthEnums } from '../auth';

export type BootstrapOptions = {
  appModule: ClassConstructor<unknown>;
  port: number;
  appName: string;
  appDescription: string;
  website: string;
  host: string;
  email: string;
  https?: boolean;
};

export async function bootstrap(options: BootstrapOptions) {
  const {
    appDescription,
    appModule,
    appName,
    email,
    host,
    port,
    website,
    https,
  } = options;

  const app = https
    ? await NestFactory.create(appModule, {
        httpsOptions: {
          cert: readFileSync(join(__dirname, 'cert.pem')),
          key: readFileSync(join(__dirname, 'key.pem')),
        },
      })
    : await NestFactory.create(appModule);

  const GLOBAL_PREFIX = 'api';

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.use(helmet());
  app.enableCors({ origin: '*' });

  app.use(favicon(join(__dirname, 'favicon.svg')));

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(appDescription)
    .addBearerAuth({ type: 'http', scheme: 'Bearer' }, AuthEnums.BEARER)
    .setContact('Contact', website, email)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://${host}:${port}/${GLOBAL_PREFIX}`
  );
}
