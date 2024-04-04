/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { v4 } from 'uuid';

export function createMetadata(
  override = true
): [
  (value?: any) => CustomDecorator<any>,
  (reflector: Reflector, ctx: ExecutionContext) => any
] {
  const token: string = v4();
  return [
    function set(value?: any) {
      return SetMetadata(token, value !== undefined ? value : true);
    },

    function get(reflector: Reflector, ctx: ExecutionContext) {
      if (override) {
        return reflector.getAllAndOverride(token, [
          ctx.getClass(),
          ctx.getHandler(),
        ]);
      } else {
        return reflector.getAllAndMerge(token, [
          ctx.getClass(),
          ctx.getHandler(),
        ]);
      }
    },
  ];
}
