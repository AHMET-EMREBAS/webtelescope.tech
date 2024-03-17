import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH_NAME } from './constants';
import { applyDecorators, Controller } from '@nestjs/common';

export function ResourceController(name: string = '', basePath = '') {
  return applyDecorators(
    ApiTags(name),
    Controller(basePath),
    ApiBearerAuth(API_BEARER_AUTH_NAME)
  );
}

