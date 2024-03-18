import { Body } from '@nestjs/common';
import { Validate } from '../../pipe';

export function BodyParam() {
  return Body(Validate());
}

