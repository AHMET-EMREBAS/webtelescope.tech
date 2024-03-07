import { names } from '@nx/devkit';
import { ModelDefinition, PropertyDefinition } from '../type';
import { isRelationColumn, printColumnType } from './print-entity';

export function printCoreDtoImports(model: ModelDefinition) {}

export function printDtoImports(model: ModelDefinition) {}

export function printPropertyType(property: PropertyDefinition) {
  if (isRelationColumn(property)) {
    if (property.type === 'Many') {
      return 'IDDto[]';
    } else {
      return 'IDDto';
    }
  } else {
    return printColumnType(property);
  }
}

export function toPropertyDecoratorName(property: PropertyDefinition) {
  if (isRelationColumn(property)) {
    return `@${property.type}Property()`;
  } else {
    if (property.type === 'Text') {
      if (property.format) {
        return `${names(property.format).className}Property`;
      } else {
        return `TextProperty`;
      }
    } else {
      return `${property.type}Property`;
    }
  }
}

export function printPropertyDecoratorOptions(property: PropertyDefinition) {
  if (isRelationColumn(property)) {
    return property.target;
  } else {
    const required = property.required === true ? 'required:true,' : '';
    const unique = property.unique === true ? 'unique:true' : '';
    return `${required}${unique}`;
  }
}
export function printPropertyDecorator(property: PropertyDefinition) {
  const name = toPropertyDecoratorName(property);
  const options = printPropertyDecoratorOptions(property);
  return `@${name}(${options})`;
}

export function printPropertyDefinition(
  name: string,
  property: PropertyDefinition
) {
  if (isRelationColumn(property)) {
    const isRequired = property.type === 'Owner' ? '!:' : '?:';
    return `${name}${isRequired}${printPropertyType(property)}`;
  } else {
    const isRequired = property.required === true ? '!:' : '?:';
    return `${name}${isRequired}${printPropertyType(property)}`;
  }
}

export function printProperty(name: string, property: PropertyDefinition) {
  return `${printPropertyDecorator(property)}${printPropertyDefinition(
    name,
    property
  )};`;
}

export function printDto(model: ModelDefinition) {}
