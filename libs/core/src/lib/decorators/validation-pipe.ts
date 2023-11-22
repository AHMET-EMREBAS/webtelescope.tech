/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type, ValidationPipe as __ValidationPipe } from '@nestjs/common';


/**
 * ValidationPipe with transform options true.
 */
export const ValidationPipe = new __ValidationPipe({
  transform: true,
});

/**
 * Create ValidationPipe for the entity class
 * @param dtoClass 
 * @returns 
 */
export function createValidationPipe(dtoClass: Type<any>) {
  return new __ValidationPipe({
    expectedType: dtoClass,
    transform: true,
  });
}
