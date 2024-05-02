import { Param, ParseIntPipe } from '@nestjs/common';

export function SourceId() {
  return Param('id', ParseIntPipe);
}
