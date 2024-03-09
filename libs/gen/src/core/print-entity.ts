import { readFileSync } from 'fs';
import {
  ModelDefinition,
  PropertyDefinition,
  PropertyType,
  RelationDefinition,
} from '../type';
import { names } from '@nx/devkit';

export function getPackagePrefix(): string {
  const packageJSON = JSON.parse(readFileSync('./package.json')?.toString());
  if (packageJSON.name) {
    return (packageJSON.name as string).split('/').shift();
  }
  throw new Error('set name property in pacakge.json!');
}

export function isRelationColumn(
  property: PropertyDefinition
): property is RelationDefinition {
  return (
    property.type === 'One' ||
    property.type === 'Many' ||
    property.type === 'Owner'
  );
}

export function toColumnDecoratorName(type: PropertyType) {
  return `${type}Column`;
}

export function printEntityCoreImports(model: ModelDefinition) {
  const entries = Object.entries(model.properties);

  const imports =
    entries
      .map((obj) => {
        const value = obj[1];
        if (!isRelationColumn(value)) {
          return toColumnDecoratorName(value.type);
        }
        return undefined;
      })
      .filter((e) => e)
      .join(',') || '';

  return `import{Entity,BaseEntity,${imports}}from'${getPackagePrefix()}/core';`;
}

export function printEntityImport(options: PropertyDefinition) {
  if (isRelationColumn(options)) {
    return `import{${options.target}}from'./../../${
      names(options.target).fileName
    }';`;
  }
  return '';
}

export function printEntityImports(model: ModelDefinition) {
  const entries = Object.entries(model.properties);
  const imports =
    entries
      .map((obj) => {
        return printEntityImport(obj[1]);
      })
      .filter((e) => e)
      .join(' ') || '';

  return imports;
}

export function printColumnType(property: PropertyDefinition) {
  if (isRelationColumn(property)) {
    const isArray = property.type === 'Many' ? '[]' : '';
    return `${property.target}${isArray}`;
  } else {
    return property.type === 'Text'
      ? 'string'
      : property.type === 'Boolean'
      ? 'boolean'
      : property.type === 'Date'
      ? 'Date'
      : property.type === 'Number'
      ? 'number'
      : property.type === 'Record'
      ? 'Record<string,unkown>'
      : 'any';
  }
}

export function printColumnDefinition(
  name: string,
  property: PropertyDefinition
) {
  if (isRelationColumn(property)) {
    const isRequiredMark = property.type === 'Owner' ? '!:' : '?:';

    return `${name}${isRequiredMark}${printColumnType(property)};`;
  } else {
    const isRequiredMark = property.required ? '!:' : '?:';
    return `${name}${isRequiredMark}${printColumnType(property)};`;
  }
}

export function printColumnDecorator(property: PropertyDefinition) {
  if (isRelationColumn(property)) {
    return `@${property.type}(${property.target})`;
  } else {
    const __decoratorOptions = [
      property.required ? 'required:true' : '',
      property.unique ? 'unique:true' : '',
    ]
      .filter((e) => e)
      .join(',');

    const options = __decoratorOptions ? `{${__decoratorOptions}}` : '';

    return `@${toColumnDecoratorName(property.type)}(${options})`;
  }
}

export function printColumn(name: string, property: PropertyDefinition) {
  return `${printColumnDecorator(property)}${printColumnDefinition(
    name,
    property
  )}`;
}

export function printEntity(name: string, model: ModelDefinition) {
  const imports = `${printEntityCoreImports(model)}${printEntityImports(
    model
  )}`;
  const properties = Object.entries(model.properties)
    .map(([key, value]) => {
      return printColumn(key, value);
    })
    .join(' ');
  return `${imports}@Entity()export class ${
    names(name).className
  } extends BaseEntity{${properties}}`;
}
