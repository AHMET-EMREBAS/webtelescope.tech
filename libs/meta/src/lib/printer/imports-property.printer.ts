import { Model } from '../meta';
import { names } from '../utils';

export function printPropertyImports(model: Model) {
  const result = [
    ...new Set(
      Object.entries(model.properties ?? {})
        .filter(([, value]) => value?.type === 'object' || value?.enums)
        .map(([key, value]) => {
          return value?.enums ? names(key).className : value?.objectType;
        })
    ),
  ].join(', ');

  return `import { ${result} } from '../__types';`;
}
