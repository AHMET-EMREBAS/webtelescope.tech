import { Controller as __Controller } from '@nestjs/common';
import { CombineClassDecorators } from './combine';
import { ApiTags } from '@nestjs/swagger';

export type ControllerOptions = {
  tags?: string[];
  route?: string;
};
export function Controller(options?: ControllerOptions): ClassDecorator {
  return CombineClassDecorators(
    ApiTags(...(options?.tags || [])),
    __Controller(options?.route || '')
  );
}
