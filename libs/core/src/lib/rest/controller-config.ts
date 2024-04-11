import { CanActivate, NestInterceptor, Type } from '@nestjs/common';

export type ControllerConfig = {
  guards?: Type<CanActivate>[];
  interceptors?: Type<NestInterceptor>[];
  decorators?: (MethodDecorator | ClassDecorator)[];
  medatadata?: (MethodDecorator | ClassDecorator)[];
};

export type ControllerConfiguration<ControllerInterface> = Partial<
  Record<keyof ControllerInterface, ControllerConfig>
>;
