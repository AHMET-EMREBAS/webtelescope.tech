import { Model } from '../meta';
import { printProperty } from './property.printer';
import { printRelation } from './relation.printer';

export function printDtoModelProperties(model: Model) {
  return Object.entries(model.properties ?? {})
    .map(([key, value]) => {
      return value && printProperty('dto', key, value);
    })
    .join('\n\t');
}

export function printDtoModelRelations(model: Model) {
  return Object.entries(model.relations ?? {})
    .map(([key, value]) => {
      return value && printRelation('dto', key, value);
    })
    .join('\n\t');
}

export function printDto(model: Model) {
  const propertiesText = printDtoModelProperties(model);
  const relationsText = printDtoModelRelations(model);

  const className = `Create${model.modelName}Dto`;

  return `export class ${className} implements I${className} {\n\t${propertiesText}\n\t${relationsText}\n}`;
}
