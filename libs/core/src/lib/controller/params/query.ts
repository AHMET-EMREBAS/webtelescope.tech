import { Query } from '@nestjs/common';
import { Validate } from '../../pipe';

export function QueryParam() {
  return Query(Validate());
}
