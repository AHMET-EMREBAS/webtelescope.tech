import { ValidationPipe } from '@nestjs/common';

export const ValidateDtoPipe = new ValidationPipe({
  transform: true,
  transformOptions: {
    exposeDefaultValues: true,
  },
});
