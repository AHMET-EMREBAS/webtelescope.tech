/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ParamNames } from '@webpackages/route-builder';
import { ClassConstructor } from 'class-transformer';

export function ParamId() {
  return Param(ParamNames.ID, ParseIntPipe);
}

export function QueryParam(dto?: ClassConstructor<any>) {
  return Query(new ValidationPipe({ expectedType: dto, transform: true }));
}

export function BodyParam(dto?: ClassConstructor<any>) {
  return Body(new ValidationPipe({ transform: true, expectedType: dto }));
}

export function ParamParam(dto?: ClassConstructor<any>) {
  return Param(new ValidationPipe({ transform: true, expectedType: dto }));
}
