import { Model } from '../meta';
import { toPropertyName } from '../utils';
import { printProperty } from './property.printer';

export function printQueryDtopModelProperties(
  model: Model,
  prefix: string = ''
): string {
  return Object.entries(model.properties || {})
    .map(([key, value]) => {
      if (value?.searchable) {
        return printProperty('dto-query', toPropertyName(prefix, key), value);
      }
      return undefined;
    })
    .filter((e) => e)
    .join('\n\t');
}

export function printQueryDto(model: Model) {
  const { modelName, relations } = model;

  const propertiesText = printQueryDtopModelProperties(model);

  const relationsText = Object.entries(relations ?? {})
    .map(([, value]) => value?.model)
    .filter((v) => v)
    .map((v) => v && printQueryDtopModelProperties(v, v.modelName))
    .join('\n\t');

  const className = `Query${modelName}Dto`;
  return `export class ${className} implements I${className} {\n\t${propertiesText}\n\t${relationsText}\n}`;
}
