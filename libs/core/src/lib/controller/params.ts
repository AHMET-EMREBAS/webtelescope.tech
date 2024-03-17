import { Param, ParseIntPipe } from '@nestjs/common';

export function ParamId() {
  return Param('id', ParseIntPipe);
}
