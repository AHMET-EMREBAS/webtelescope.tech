import { Model } from '../meta';

export function printUpdateDto(model: Model) {
  const classname = `Update${model.modelName}Dto`;
  const extendClass = classname.replace('Update', 'Create');
  return `export class ${classname} extends PartialType(${extendClass}) { }`;
}
