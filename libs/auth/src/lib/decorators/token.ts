/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AUTH_NAME } from '@webpackages/common';

export const AccessToken = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    return context.switchToHttp().getRequest()[AUTH_NAME];
  }
);
