/* eslint-disable @typescript-eslint/no-explicit-any */
export type ValidationOptions = Record<string, unknown>;

type Decorator = PropertyDecorator | ClassDecorator | MethodDecorator;

function combineDecorators<T extends Decorator>(...decorators: T[]): T {
  return ((...args: unknown[]) => {
    const [target, propertyName, determiner] = args;
    decorators?.forEach((d) => (d as any)(target, propertyName, determiner));
  }) as unknown as T;
}

export function Validation(options: ValidationOptions): PropertyDecorator {
  return combineDecorators();
}
