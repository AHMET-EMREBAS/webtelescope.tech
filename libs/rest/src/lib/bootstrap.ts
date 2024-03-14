/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClassConstructor } from 'class-transformer';
import { readFileSync } from 'fs';
import { configureSwagger } from './swagger';
import helmet from 'helmet';

export type BootstrapOptions = {
  module: ClassConstructor<any>;
  https: boolean;
  title: string;
  authtokenName: string;
  version: string;
};

export async function bootstrap(options: BootstrapOptions) {
  const { authtokenName, https, module, title, version } = options;
  const httpsOptions = https
    ? {
        key: readFileSync('./secrets/private-key.pem'),
        cert: readFileSync('./secrets/public-certificate.pem'),
      }
    : {};

  const appInstance = await NestFactory.create(module, { httpsOptions });

  const GLOBAL_PREFIX = 'api';
  const PORT = process.env['PORT'] || 3000;
  const HOST = process.env['HOST'] || 'localhost';
  appInstance.use(helmet());
  appInstance.setGlobalPrefix(GLOBAL_PREFIX);
  appInstance.enableCors({ origin: '*' });

  configureSwagger({
    appInstance,
    basePath: GLOBAL_PREFIX,
    title,
    authtokenName,
    version,
  });

  await appInstance.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://${HOST}:${PORT}/${GLOBAL_PREFIX}`
  );
}
