/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClassConstructor } from 'class-transformer';
import { readFileSync } from 'fs';
import { configureSwagger } from './swagger';
import helmet from 'helmet';

export type BootstrapOptions = {
  module: ClassConstructor<any>;
  https?: boolean;
  title?: string;
  version?: string;
};

export async function bootstrap(options: BootstrapOptions) {
  const { https, module, title, version } = options;

  const appInstance = https
    ? await NestFactory.create(module, {
        httpsOptions: {
          key: readFileSync('./secrets/key.pem'),
          cert: readFileSync('./secrets/cert.pem'),
        },
      })
    : await NestFactory.create(module);

  const GLOBAL_PREFIX = 'api';
  const PORT = process.env['PORT'] || 3000;
  const HOST = process.env['HOST'] || 'localhost';
  appInstance.use(helmet());
  appInstance.enableCors({ origin: '*' });
  appInstance.setGlobalPrefix(GLOBAL_PREFIX);

  configureSwagger({
    appInstance,
    title,
    version,
  });

  await appInstance.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://${HOST}:${PORT}/${GLOBAL_PREFIX}`
  );
}
