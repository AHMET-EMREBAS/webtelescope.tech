import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export type SwaggerOptions = {
  app: NestApplication;
  title: string;
  version: string;
  basePath: string;
  tokenName: string;
};
export function configureSwagger(options: SwaggerOptions) {
  const { app, basePath, title, tokenName, version } = options;

  const config = new DocumentBuilder()
    .setTitle(title)
    .setVersion(version)
    .setBasePath(basePath)
    .addBearerAuth({ type: 'http' }, tokenName)
    .build();

  const doc = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, doc);
}
