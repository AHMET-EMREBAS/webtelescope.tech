import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const UserId = createParamDecorator(
  (data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user.id;
  }
);

export const Id = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest<Request>().params['id'];
  }
);


