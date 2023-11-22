/**
 * Apply list of property decorators to the property
 * @param decorators {PropertyDecorator}
 * @returns
 */
export function CombinePropertyDecorators(
  ...decorators: PropertyDecorator[]
): PropertyDecorator {
  return function (target, propertyKey) {
    decorators.forEach((e) => e(target, propertyKey));
  };
}

/**
 * Apply list of class decorators to the class
 * @param decorators {ClassDecorator}
 * @returns {ClassDecorator}
 */
export function CombineClassDecorators(
  ...decorators: ClassDecorator[]
): ClassDecorator {
  return function (target) {
    decorators.forEach((e) => e(target));
  };
}


/**
 * Apply list of method decorators to the method
 * @param decorators {MethodDecorator}
 * @returns {MethodDecorator}
 */
export function CombineMethodDecorators(
  ...decorators: MethodDecorator[]
): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    decorators.forEach((e) => e(target, propertyKey, descriptor));
  };
}


