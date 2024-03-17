import { ValidationPipe } from '@nestjs/common';

export function Validate() {
  return new ValidationPipe({
    transform: true,
    transformOptions: {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    },
  });
}
