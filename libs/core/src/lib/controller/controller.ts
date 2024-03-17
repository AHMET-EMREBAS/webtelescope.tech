import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { applyDecorators, Controller } from '@nestjs/common';
import { Policy } from '../auth';

export function ResourceController(resourceName: string) {
  return applyDecorators(
    ApiTags(resourceName),
    Controller(),
    ApiBearerAuth(Policy.ACCESS_TOKEN_NAME)
  );
}
