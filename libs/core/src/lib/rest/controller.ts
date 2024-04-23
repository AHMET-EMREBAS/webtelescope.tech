import { Controller as NetsController, applyDecorators } from '@nestjs/common';
import { AuthNames, SecurityType, SecurityTypeMatcher } from '../auth';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiCookieAuth,
  ApiTags,
} from '@nestjs/swagger';

export type ControllerOptions = {
  path?: string;
  security?: {
    apiKey: boolean;
    cookie: boolean;
    credentials: boolean;
  };
  tags?: string[];
};

export function Controller(options: ControllerOptions) {
  const decorators: ClassDecorator[] = [];

  const { path, security, tags } = options;

  if (tags) decorators.push(ApiTags(...tags));

  return applyDecorators(NetsController(path ?? ''), ...decorators);
}
