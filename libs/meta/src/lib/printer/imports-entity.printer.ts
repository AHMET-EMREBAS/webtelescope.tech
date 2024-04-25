import { Model } from '../meta';
import { names } from '../utils';
import { printPropertyImports } from './imports-property.printer';

export function printEntityImports(model: Model) {
  const objectTypesImport = printPropertyImports(model);
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
