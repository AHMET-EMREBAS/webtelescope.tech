import { Logger } from '@nestjs/common';
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
export function extractOrgnameFromHeader(req: Request): string {
  const logger = new Logger('Extractor');

  const result = (req.headers[AuthEnums.X_ORGNAME] as string) ?? 'main';
  logger.debug(`Extracted ${AuthEnums.X_ORGNAME} from headers : ${result}`);
  return result;
}
