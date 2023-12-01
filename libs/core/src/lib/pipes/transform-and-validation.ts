import { ValidationPipe } from '@nestjs/common';

/**
 * Transform and validate the data-transform-objects
 */
export const TransformAndValidatePipe = new ValidationPipe({
  transform: true,
  transformOptions: {
    exposeUnsetFields: false,
  },
});
