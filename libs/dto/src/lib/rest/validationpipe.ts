import { Type, ValidationPipe as VP } from '@nestjs/common';

export function ValidationPipe(expectedType?: Type) {
  return new VP({
    expectedType,
    transform: true,
    transformOptions: {
      excludeExtraneousValues: true,
    },
    validationError: {
      target: false,
      value: false,
    },
  });
}
