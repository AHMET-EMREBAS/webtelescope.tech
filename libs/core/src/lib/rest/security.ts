import { applyDecorators } from '@nestjs/common';
import {
  ApiKeyAuth,
  CookieAuth,
  CredentialsAuth,
  SecurityOptions,
  SetPermission,
  SetRole,
  SetScope,
} from '../auth';

export function getSecurityDecorator(security: SecurityOptions) {
  const decorators: ClassDecorator | MethodDecorator[] = [];

  if (security?.apiKey) decorators.push(ApiKeyAuth());
  if (security?.cookie) decorators.push(CookieAuth());
  // if (security?.credentials) decorators.push(CredentialsAuth());

  if (security?.scope) decorators.push(SetScope(security.scope));
  if (security?.permission) decorators.push(SetPermission(security.permission));
  if (security?.role) decorators.push(SetRole(security.role));

  return applyDecorators(...decorators);
}
