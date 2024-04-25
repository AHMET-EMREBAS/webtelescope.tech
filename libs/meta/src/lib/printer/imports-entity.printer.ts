import { Model } from '../meta';
import { names } from '../utils';

export function printEntityImports(model: Model) {
  const objectTypesList = [
    ...new Set(
      Object.entries(model.properties ?? {})
        .filter(([, value]) => value?.type === 'object' || value?.enums)
        .map(([key, value]) => {
          return value?.enums ? names(key).className : value?.objectType;
        })
        .filter((e) => e)
    ),
  ].join(', ');

  const objectTypesImport = `import { ${objectTypesList} } from '../types';`;
  const relationTypesImport = [
    ...new Set(
      Object.entries(model.relations ?? {})
        .map(([, value]) => value?.target)
        .filter((e) => e)
    ),
  ]
    .map((e) => [names(e!).fileName, e])
    .map(
      ([fileName, className]) =>
        `import { ${className} } from '../${fileName}';`
    )
    .join('\n');

  return `${relationTypesImport} \n${objectTypesImport}`;
}
