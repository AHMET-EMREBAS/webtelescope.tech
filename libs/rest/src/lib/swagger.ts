/* eslint-disable @typescript-eslint/no-explicit-any */
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ACCESS_TOKEN_NAME } from '@webpackages/common';

export type SwaggerOptions = {
  appInstance: INestApplication;
  title?: string;
  version?: string;
};

export function configureSwagger(options: SwaggerOptions) {
  const { appInstance, title, version } = options;

  const config = new DocumentBuilder()
    .setTitle(title || 'Api')
    .setVersion(version || '1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      ACCESS_TOKEN_NAME
    )
    .build();

  const doc = SwaggerModule.createDocument(appInstance, config);

  SwaggerModule.setup('api', appInstance, doc);
}
