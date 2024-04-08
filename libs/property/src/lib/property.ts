import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export function Property(): PropertyDecorator {
  return applyDecorators(ApiProperty({ type: 'string' }), IsString());
}
