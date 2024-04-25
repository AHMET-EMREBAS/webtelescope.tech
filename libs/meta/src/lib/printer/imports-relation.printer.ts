import { Model } from '../meta';
import { names } from '../utils';

export function printRelationImports(model: Model) {
  const result = [
    ...new Set(
      Object.entries(model.relations ?? {}).map(([, value]) => {
        return value?.target;
      })
    ),
  ]
    .map((e) => {
      return `import { ${e} } from '../${names(e!).fileName}';`;
    })
    .join('\n');

  return result;
}
