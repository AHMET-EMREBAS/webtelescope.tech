import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { AuthEnums } from './enums';

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
