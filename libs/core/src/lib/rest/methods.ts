import {
  Get as NestGet,
  Post as NestPost,
  Put as NestPut,
  Delete as NestDelete,
  applyDecorators,
} from '@nestjs/common';
import { SecurityOptions } from '../auth';
import { getSecurityDecorator } from './security';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export type MethodOptions = {
  path: string;
  security?: SecurityOptions;
};
export function Get(options: MethodOptions) {
  const { path, security } = options;
  const decorators: (ClassDecorator | MethodDecorator)[] = [
    ApiOkResponse({ description: 'Success' }),
    ApiUnprocessableEntityResponse({ description: 'Query validation error' }),
    ApiNotFoundResponse({ description: 'Not found' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error!' }),
  ];

  if (security) decorators.push(getSecurityDecorator(security));

  return applyDecorators(NestGet(path ?? ''), ...decorators);
}

export function Post(options: MethodOptions) {
  const { path, security } = options;
  const decorators: MethodDecorator[] = [
    ApiCreatedResponse({ description: 'Success' }),
    ApiUnprocessableEntityResponse({ description: 'Input validation error' }),
    ApiNotFoundResponse({ description: 'Not found' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error!' }),
  ];

  if (security) decorators.push(getSecurityDecorator(security));

  return applyDecorators(NestPost(path ?? ''), ...decorators);
}

export function Update(options: MethodOptions) {
  const { path, security } = options;
  const decorators: MethodDecorator[] = [
    ApiOkResponse({ description: 'Success' }),
    ApiUnprocessableEntityResponse({ description: 'Query validation error' }),
    ApiNotFoundResponse({ description: 'Not found' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error!' }),
  ];

  if (security) decorators.push(getSecurityDecorator(security));

  return applyDecorators(NestPut(path ?? ''), ...decorators);
}

export function Delete(options: MethodOptions) {
  const { path, security } = options;
  const decorators: MethodDecorator[] = [
    ApiOkResponse({ description: 'Success' }),
    ApiUnprocessableEntityResponse({ description: 'Query validation error' }),
    ApiNotFoundResponse({ description: 'Not found' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error!' }),
  ];

  if (security) decorators.push(getSecurityDecorator(security));

  return applyDecorators(NestDelete(path ?? ''), ...decorators);
}
