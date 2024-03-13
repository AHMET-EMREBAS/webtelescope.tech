/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Api')
    .setVersion('1.0.0')
    .setBasePath('api')
    .addBearerAuth({ type: 'http' }, 'authtoken')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
