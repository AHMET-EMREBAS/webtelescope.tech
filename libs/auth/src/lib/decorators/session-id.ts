import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Get sesion id
 * @returns
 */
export const SessionId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().sessionId;
  }
);
