/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClassConstructor } from 'class-transformer';

export async function bootstrap(appModule: ClassConstructor<any>) {
  const appInstance = await NestFactory.create(appModule);

  const GLOBAL_PREFIX = 'api';
  const PORT = process.env['PORT'] || 3000;
  const HOST = process.env['HOST'] || 'localhost';

  appInstance.setGlobalPrefix(GLOBAL_PREFIX);
  appInstance.enableCors({ origin: '*' });

  await appInstance.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://${HOST}:${PORT}/${GLOBAL_PREFIX}`
  );
}
