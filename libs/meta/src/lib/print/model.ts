import { Model } from '../meta';
import { toPropertyName } from '../utils';
import {
  ClassDeclerationType,
  IDecorate,
  IExtend,
  IGeneric,
  IImplement,
  IImport,
  IName,
  IPrint,
  ClassType,
  CommonObjectTypes,
  IClassName,
  DecoratorNames,
} from './__common';
import { PropertyPrinter } from './property';
import { RelationPrinter } from './relation';

export class ModelPrinter
  implements
    IPrint,
    IDecorate,
    Pick<IName, 'name'>,
    IImport,
    IImplement,
    IExtend,
    IName,
    IClassName,
    IGeneric
{
  constructor(
    protected readonly classType: ClassType,
    protected readonly model: Model
  ) {}

  exportKeyWord() {
    return 'export';
  }

  extendKeyWord() {
    return 'extends';
  }

  implementsKeyWord() {
    return 'implements';
  }

  modelName() {
    return this.model.modelName;
  }

  name(): string {
    return this.model.modelName;
  }

  toClassName(classType: ClassType, className: string): string {
    switch (classType) {
      case ClassType.ICreateDto:
      case ClassType.CreateDto:
      case ClassType.UpdateDto:
      case ClassType.IUpdateDto:
      case ClassType.QueryDto:
      case ClassType.IQueryDto:
        return classType.replace('Dto', className + 'Dto');
      case ClassType.Entity:
      case ClassType.IEntity:
        return classType.replace('Entity', className);
      case ClassType.View:
      case ClassType.IView:
        return classType.replace('View', className + 'View');
    }
  }

  viewName(modelName: string, propertyName: string): string {
    return toPropertyName(modelName, propertyName);
  }

  importing(): string {
    return '';
  }

  decorators(): string {
    switch (this.classType) {
      case ClassType.CreateDto:
      case ClassType.UpdateDto:
      case ClassType.QueryDto:
        return DecoratorNames.DTO;
      case ClassType.Entity:
        return DecoratorNames.ENTITY;
      default:
        return '';
    }
  }

  implements(): string {
    switch (this.classType) {
      case ClassType.Entity:
        return this.toClassName(ClassType.IEntity, this.modelName());
      case ClassType.IEntity:
        return CommonObjectTypes.IBaseEntity;
      case ClassType.IView:
        return CommonObjectTypes.IBaseEntity;
      case ClassType.View:
        return CommonObjectTypes.BaseEntityView;
      case ClassType.IUpdateDto:
        return `PartialType(Create${this.modelName()}Dto)`;
      default:
        return '';
    }
  }
  __extendings(): string {
    switch (this.classType) {
      case ClassType.Entity:
        return CommonObjectTypes.BaseEntity;
      case ClassType.IEntity:
        return CommonObjectTypes.IBaseEntity;
      case ClassType.IView:
        return CommonObjectTypes.IBaseEntity;
      case ClassType.View:
        return CommonObjectTypes.BaseEntityView;
      case ClassType.IUpdateDto:
        return `PartialType(Create${this.modelName()}Dto)`;

      default:
        return '';
    }
  }

  extendings(): string {
    const e = this.__extendings();
    return e ? `${this.extendKeyWord()} ${e}` : '';
  }

  classDeclerationType(): ClassDeclerationType {
    switch (this.classType) {
      case ClassType.IEntity:
      case ClassType.ICreateDto:
      case ClassType.IQueryDto:
      case ClassType.IUpdateDto:
      case ClassType.IView:
        return ClassDeclerationType.INTERFACE;
      default:
        return ClassDeclerationType.CLASS;
    }
  }

  __generics(): string {
    if (!this.model.relations) return '';
    switch (this.classType) {
      case ClassType.IEntity:
        return Object.values(this.model.relations)
          .map((options) => {
            return CommonObjectTypes.GENERIC_PREFIX + options.model.modelName;
          })
          .join(', ');
    }
    return '';
  }

  generics(): string {
    const g = this.__generics();
    return g && `<${g}>`;
  }

  __properties(classType: ClassType): string {
    if (!this.model.properties) return '';
    return Object.entries(this.model.properties)
      .map(([propertyName, options]) => {
        return new PropertyPrinter(
          classType,
          this.modelName(),
          propertyName,
          options!
        );
      })
      .map((e) => e.print())
      .join('\n');
  }

  __relations(classType: ClassType): string {
    if (!this.model.relations) return '';

    return Object.entries(this.model.relations)
      .map(([propertyName, options]) => {
        options = options!;
        return new RelationPrinter(
          classType,
          this.modelName(),
          propertyName,
          options.type,
          options.required
        );
      })
      .map((e) => e.print())
      .join('\n');
  }

  printProperties() {
    return [
      this.__properties(this.classType),
      this.__relations(this.classType),
    ].join(' ');
  }

  decleration(content: string) {
    const sf = (value: string) => (value ? value + ' ' : '');
    return [
      this.decorators(),
      this.exportKeyWord(),
      this.classDeclerationType(),
      this.name() + this.generics(),
      this.extendings(),
      this.implements(),
      '{',
      content,
      '}',
    ]
      .map(sf)
      .join('');
  }

  print(): string {
    return this.decleration(this.printProperties());
  }
}
