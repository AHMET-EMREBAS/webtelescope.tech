import {
  Body as NestBody,
  Param as NestParam,
  Query as NestQuery,
  Type,
} from '@nestjs/common';
import { ValidationPipe } from './validationpipe';

export function Body(expectedType?: Type) {
  return NestBody(ValidationPipe(expectedType));
}

export function Param() {
  return NestParam(ValidationPipe());
}

export function Query() {
  return NestQuery(ValidationPipe());
}
