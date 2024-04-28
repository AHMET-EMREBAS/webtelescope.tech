import { names } from '@webpackages/utils';

export function toPropertyName(...args: string[]) {
  const normal = args
    .map(names)
    .map((e) => e.className)
    .join('');
    
  return names(normal).propertyName;
}
