import { ValidationPipe } from '@nestjs/common';

export const TransformAndValidatePipe = new ValidationPipe({
  transform: true,
});
