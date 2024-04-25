import { Model } from '../meta';
import { printProperty } from './property.printer';
import { printRelation } from './relation.printer';

export function printEntityModelProperties(model: Model) {
  return Object.entries(model.properties ?? {})
    .map(([key, value]) => {
      return value && printProperty('entity', key, value);
    })
    .join('\n\t');
}

export function printEntityModelRelations(model: Model) {
  return Object.entries(model.relations ?? {})
    .map(([key, value]) => {
      return value && printRelation('entity', key, value);
    })
    .join('\n\t');
}

export function printEntity(model: Model) {
  const className = model.modelName;

  const propertiesText = printEntityModelProperties(model);
  const relationsText = printEntityModelRelations(model);
  return `export class ${className} extends BaseEntity implements I${className} {\n\t${propertiesText}\n\t${relationsText}\n}`;
}
