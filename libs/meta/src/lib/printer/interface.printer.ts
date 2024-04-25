import { Model } from '../meta';
import { printProperty } from './property.printer';
import { printRelation } from './relation.printer';

export function printInterfaceProperties(model: Model) {
  return Object.entries(model.properties ?? {})
    .map(([key, value]) => {
      return value && printProperty('interface', key, value);
    })
    .join('\n\t');
}

export function printInterfaceRelations(model: Model) {
  return Object.entries(model.relations ?? {})
    .map(([key, value]) => {
      return value && printRelation('interface', key, value);
    })
    .join('\n\t');
}

export function printInterface(model: Model) {
  const className = model.modelName;

  const propertiesText = printInterfaceProperties(model);
  const relationsText = printInterfaceRelations(model);
  return `export interface I${className} extends IBaseEntity {\n\t${propertiesText}\n\t${relationsText}\n}`;
}
