import { Request } from 'express';
import { AuthEnums } from '@webpackages/common';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthHeaderParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return (ctx.switchToHttp().getRequest() as Request).headers.authorization;
  }
);

export const SessionParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()[AuthEnums.SESSION];
  }
);

export const UserParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()[AuthEnums.USER];
  }
);
