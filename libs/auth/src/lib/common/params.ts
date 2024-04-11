import { Request } from 'express';
import { AuthEnums } from '@webpackages/common';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IRequest } from '@webpackages/model';

export const AuthorizationParam = createParamDecorator(
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

export const OrgnameParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest<IRequest>().headers['x-orgname'];
  }
);
