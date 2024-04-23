import { Controller as NetsController, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiKeyAuth,
  CookieAuth,
  CredentialsAuth,
  SetPermission,
  SetRole,
  SetScope,
} from '../auth';

export type SecurityOptions = {
  apiKey: boolean;
  cookie: boolean;
  credentials: boolean;
  scope: string;
  role: string;
  permission: string;
};

export type ControllerOptions = {
  path?: string;
  security?: SecurityOptions;
  tags?: string[];
};

export function Controller(options: ControllerOptions) {
  const decorators: ClassDecorator[] = [];

  const { path, security, tags } = options;

  if (tags) decorators.push(ApiTags(...tags));

  if (security?.apiKey) decorators.push(ApiKeyAuth());
  if (security?.cookie) decorators.push(CookieAuth());
  if (security?.credentials) decorators.push(CredentialsAuth());

  if (security?.scope) decorators.push(SetScope(security.scope));
  if (security?.permission) decorators.push(SetPermission(security.permission));
  if (security?.role) decorators.push(SetRole(security.role));

  return applyDecorators(NetsController(path ?? ''), ...decorators);
}
