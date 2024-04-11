import { UseGuards, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ControllerConfig } from './controller-config';

export function ConfigureResource(options?: ControllerConfig) {
  if (options) {
    return applyDecorators(
      UseGuards(...(options.guards ?? [])),
      UseInterceptors(...(options.interceptors ?? [])),
      applyDecorators(...(options.medatadata ?? [])),
      applyDecorators(...(options.decorators ?? []))
    );
  }
  return applyDecorators();
}
