/* eslint-disable @typescript-eslint/no-explicit-any */
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export type SwaggerOptions = {
  appInstance: INestApplication;
  title: string;
  version: string;
  basePath: string;
  authtokenName: string;
};

export function configureSwagger(options: SwaggerOptions) {
  const { appInstance, basePath, title, authtokenName, version } = options;

  const config = new DocumentBuilder()
    .setTitle(title)
    .setVersion(version)
    .setBasePath(basePath)
    .addBearerAuth({ type: 'http' }, authtokenName)
    .build();

  const doc = SwaggerModule.createDocument(appInstance, config);

  SwaggerModule.setup('api', appInstance, doc);
}
