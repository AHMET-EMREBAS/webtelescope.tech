import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@webpackages/entity';

/**
 * Get sesion id
 * @returns
 */
export const UserData = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user as User;
  }
);
