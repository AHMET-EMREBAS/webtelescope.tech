export function CombinePropertyDecorators(
  ...decorators: PropertyDecorator[]
): PropertyDecorator {
  return function (target, propertyKey) {
    decorators.forEach((e) => e(target, propertyKey));
  };
}

export function CombineClassDecorators(
  ...decorators: ClassDecorator[]
): ClassDecorator {
  return function (target) {
    decorators.forEach((e) => e(target));
  };
}
