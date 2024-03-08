import { Param, ParseIntPipe } from '@nestjs/common';

export function IdParam() {
  return Param('id', ParseIntPipe);
}

export function RelationNameParam() {
  return Param('rn');
}

export function RelationIdParam() {
  return Param('rid');
}
