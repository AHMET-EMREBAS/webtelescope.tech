import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

/**
 * Transform and validate the data-transform-objects
 */
export const TransformAndValidatePipe = new ValidationPipe({
  transform: true,
  transformOptions: {
    exposeUnsetFields: false,
    exposeDefaultValues: true,
  },
  exceptionFactory(errors) {
    const __errors = errors.map((e) => {
      return { property: e.property, constraints: { ...e.constraints } };
    });

    throw new UnprocessableEntityException(__errors);
  },
});
