import { Param as NestParam } from '@nestjs/common';
import { TransformAndValidatePipe } from '../common';

export function Param() {
  return NestParam(TransformAndValidatePipe);
}
