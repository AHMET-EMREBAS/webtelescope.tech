import { ValidationPipe } from '@nestjs/common';

/**
 * Transform and validate the input pipe
 * @returns
 */
export function Validate() {
  return new ValidationPipe({
    transform: true,
    transformOptions: {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    },
  });
}
