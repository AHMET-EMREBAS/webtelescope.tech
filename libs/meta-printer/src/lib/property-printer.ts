import { PropertyOptions, PropertyOptionsManager } from '@webpackages/meta';
import {
  ClassType,
  DecoratorPrinter,
  DocPritner,
  PropertyPrinter as __PropertyPrinter,
} from '@webpackages/printer';
import { ResClassType } from './resource-class-type';
import { names } from '@webpackages/utils';

export enum PropertyPrinterName {
  Column = 'Column',
  Property = 'Property',
  Relation = 'Relation',
}

export function __classType(resClassType: ResClassType) {
  return resClassType.startsWith('I') ? ClassType.INTERFACE : ClassType.CLASS;
}
export type NameResolver = (
  resouceName: string,
  propertyName: string
) => string;

function __resolveName(classType: ResClassType): NameResolver {
  switch (classType) {
    case ResClassType.Query:
    case ResClassType.IQuery:
    case ResClassType.View:
    case ResClassType.IView:
      return (r, p) => names(r + names(p).className).propertyName;
  }
  return (r, p) => p;
}

function __resolveType(classType: ResClassType): string {
  switch (classType) {
    case ResClassType.Query:
    case ResClassType.IQuery:
    case ResClassType.View:
    case ResClassType.IView:
      return '';
  }
  return '';
}

function __resolveOptions(classType: ResClassType, options: PropertyOptions) {
  const builder = new PropertyOptionsManager(options);
  switch (classType) {
    case ResClassType.Update:
    case ResClassType.Query:
      return builder.toQuery();
    case ResClassType.Create:
      return builder.toProperty();
    case ResClassType.Entity:
      return builder.toColumn();
    case ResClassType.ICreate:
    case ResClassType.IEntity:
    case ResClassType.IQuery:
    case ResClassType.IUpdate:
    case ResClassType.IView:
    case ResClassType.View:
      return options;
  }
}

export type PropertyPrinterOptions = {
  printerName: PropertyPrinterName;
  classType: ResClassType;
  propertyName: string;
  modelName: string;
  options?: any;
};

export class Printer extends __PropertyPrinter {
  constructor(protected readonly ___options: PropertyPrinterOptions) {
    const { classType, modelName, options, propertyName } = ___options;

    super({
      classType: __classType(classType),
      name: __resolveName(classType)(modelName, propertyName),
      type: __resolveType(options.type),
      isArray: options.isArray,
      decoratorsPrinter: {
        print() {
          return '';
        },
      },
      docsPrinter: new DocPritner({}),
      required: options.required,
    });
  }
}
