export function combinePropertyDecorators(
  ...decorators: PropertyDecorator[]
): PropertyDecorator {
  return function (target, properKey) {
    decorators.forEach((e) => e(target, properKey));
  };
}

export function combineMethodDecorators(
  ...decorators: MethodDecorator[]
): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    decorators.forEach((e) => e(target, propertyKey, descriptor));
  };
}

export function combineClassDecorators(
  ...decorators: ClassDecorator[]
): ClassDecorator {
  return function (target) {
    decorators.forEach((e) => e(target));
  };
}
