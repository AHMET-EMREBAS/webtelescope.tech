import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest()?.user?.id;
  }
);
