import { applyDecorators } from '@nestjs/common';
import {
  WithBearer,
  WithCookie,
  WithCredential,
  SecurityOptions,
  SetPermission,
  SetRole,
  SetScope,
} from '../auth';

export function getSecurityDecorator(security: SecurityOptions) {
  const decorators: (ClassDecorator | MethodDecorator)[] = [];
  if (security) {
    if (security.apiKey) decorators.push(WithBearer());
    if (security.cookie) decorators.push(WithCookie());
    if (security.credentials) decorators.push(WithCredential());

    if (security.scope) decorators.push(SetScope(security.scope));
    if (security.permission)
      decorators.push(SetPermission(security.permission));
    if (security.role) decorators.push(SetRole(security.role));
  }

  return applyDecorators(...decorators);
}
