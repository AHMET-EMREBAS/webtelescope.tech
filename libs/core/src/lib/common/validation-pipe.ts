import {
  HttpCode,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

export const TransformAndValidatePipe = new ValidationPipe({
  transform: true,
  errorHttpStatusCode: 422,
  exceptionFactory(errors) {
    throw new UnprocessableEntityException(errors);
  },
});
