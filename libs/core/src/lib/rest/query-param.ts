import { Query as NestQuery } from '@nestjs/common';
import { TransformAndValidatePipe } from '../common';

export function Query() {
  return NestQuery(TransformAndValidatePipe);
}
