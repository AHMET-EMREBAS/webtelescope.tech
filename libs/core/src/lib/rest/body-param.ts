import { Body as NestBody } from '@nestjs/common';
import { TransformAndValidatePipe } from '../common';

export function Body() {
  return NestBody(TransformAndValidatePipe);
}
