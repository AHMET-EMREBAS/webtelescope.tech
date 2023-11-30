export function propertyDecorators(
  ...decorators: PropertyDecorator[]
): PropertyDecorator {
  return (target, propertyName) => {
    decorators.forEach((e) => e(target, propertyName));
  };
}
export function classDecorators(
  ...decorators: ClassDecorator[]
): ClassDecorator {
  return (target) => {
    decorators.forEach((e) => e(target));
  };
}
export function methodDecorators(
  ...decorators: MethodDecorator[]
): MethodDecorator {
  return (target, propertyName, descriptor) => {
    decorators.forEach((e) => e(target, propertyName, descriptor));
  };
}
