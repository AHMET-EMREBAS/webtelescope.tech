import { Controller as NetsController, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SecurityOptions } from '../auth';
import { getSecurityDecorator } from './security';

export type ControllerOptions = {
  path?: string;
  security?: SecurityOptions;
  tags?: string[];
};

export function Controller(options: ControllerOptions) {
  const decorators: ClassDecorator[] = [];

  const { path, security, tags } = options;

  if (tags) decorators.push(ApiTags(...tags));
  if (security) decorators.push(getSecurityDecorator(security));

  return applyDecorators(NetsController(path ?? ''), ...decorators);
}
