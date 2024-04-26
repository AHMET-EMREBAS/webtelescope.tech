import { Model } from '../meta';
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
import { CommonPrinter } from './common';
import { PropertyPrinter } from './property';
import { RelationPrinter } from './relation';

export class ModelPrinter
  extends CommonPrinter
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
  constructor(classType: ClassType, protected readonly model: Model) {
    super(classType, model.modelName, '');
  }

  exportKeyWord() {
    return 'export';
  }

  extendKeyWord() {
    return 'extends';
  }

  implementsKeyWord() {
    return 'implements';
  }

  override name(): string {
    return this.model.modelName;
  }

  /**
   * Convert modelName into the classType {@link ClassType} name
   * For example, Product, IProduct, CreateProductDto, UpdateProductDto, IProductView, IUpdateProduct etc.
   * @param classType
   * @param className
   * @returns
   */
  toClassTypeName(classType: ClassType): string {
    switch (classType) {
      case ClassType.ICreateDto:
      case ClassType.CreateDto:
      case ClassType.UpdateDto:
      case ClassType.IUpdateDto:
      case ClassType.QueryDto:
      case ClassType.IQueryDto:
        return classType.replace('Dto', this.modelName + 'Dto');
      case ClassType.Entity:
      case ClassType.IEntity:
        return classType.replace('Entity', this.modelName);
      case ClassType.View:
      case ClassType.IView:
        return classType.replace('View', this.modelName + 'View');
    }
  }

  __propertyImports(classType: ClassType): string {
    return (
      this.__propertyPrinters(classType)
        ?.map((e) => e.importing())
        .join('\n') ?? ''
    );
  }
  __relationImports(classType: ClassType): string {
    return (
      this.__relationPrinters(classType)
        ?.map((e) => e.importing())
        .join('\n') ?? ''
    );
  }

  __modelImportsForCreateDto() {
    return [
      this.importFromPackage(this.baseClassesPackageName(), 'Dto', 'Property'),
      this.importFromPackage(
        this.baseInterfacesPackageName(),
        this.toClassTypeName(ClassType.ICreateDto)
      ),
    ].join('\n');
  }

  __modelImports(): string {
    switch (this.classType) {
      case ClassType.CreateDto:
        return this.__modelImportsForCreateDto();

      case ClassType.UpdateDto:
        return [
          this.importFromPackage(
            this.baseClassesPackageName(),
            'Dto',
            'PartialType'
          ),
          this.importFromSiblingFile(
            this.toClassTypeName(ClassType.ICreateDto),
            this.toClassTypeName(ClassType.CreateDto)
          ),
        ].join('\n');
      case ClassType.Entity:
      case ClassType.QueryDto:
      case ClassType.IQueryDto:
        return '';
    }
    return '';
  }

  importing(): string {
    return [
      this.__modelImports(),
      this.__propertyImports(this.classType),
      this.__relationImports(this.classType),
    ].join('\n');
  }

  decorators(): string {
    switch (this.classType) {
      case ClassType.CreateDto:
      case ClassType.UpdateDto:
      case ClassType.QueryDto:
        return `@${DecoratorNames.DTO}()`;
      case ClassType.Entity:
        return ` @${DecoratorNames.ENTITY}()`;
      default:
        return '';
    }
  }

  implements(): string {
    switch (this.classType) {
      case ClassType.Entity:
        return this.toClassTypeName(ClassType.IEntity) + this.generics();
      case ClassType.IEntity:
        return CommonObjectTypes.IBaseEntity;
      case ClassType.IView:
        return CommonObjectTypes.IBaseEntity;
      case ClassType.View:
        return CommonObjectTypes.BaseEntityView;
      case ClassType.IUpdateDto:
        return this.toClassName(ClassType.ICreateDto);
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
        return `PartialType(Create${this.modelName}Dto)`;

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

  /**
   * When the enity class implements its IEntity<T,V,A>
   * This method print the actual value of <T, V, A>
   * @returns
   */
  extendedClassGenerics() {
    if (this.model.relations) {
      return Object.values(this.model.relations)
        .map((options) => {
          return options.model.modelName;
        })
        .join(',');
    }
    return '';
  }

  generics(): string {
    const g = this.__generics();
    return g && `<${g}>`;
  }

  toClassTypeFileName(modelName: string) {
    const classType = this.classType;
    const fileName = this.toFileName(modelName);
    switch (classType) {
      case ClassType.CreateDto:
      case ClassType.ICreateDto:
        return `create-${fileName}.dto`;
      case ClassType.UpdateDto:
      case ClassType.IUpdateDto:
        return `update-${fileName}.dto`;
      case ClassType.QueryDto:
      case ClassType.IQueryDto:
        return `query-${fileName}.dto`;
      case ClassType.Entity:
      case ClassType.IEntity:
        return `${fileName}`;
      case ClassType.IView:
      case ClassType.View:
        return `${fileName}-view`;
    }
  }

  /**
   * Create list of RelationPrinters from relations
   * @param classType
   * @returns
   */
  __relationPrinters(classType: ClassType): RelationPrinter[] | undefined {
    if (this.model.relations)
      return Object.entries(this.model.relations).map(
        ([propertyName, options]) => {
          return new RelationPrinter(
            classType,
            this.modelName,
            propertyName,
            options.type,
            options.required
          );
        }
      );

    return;
  }

  /**
   * Create the list of PropertyPrinters form properties
   * @param classType
   * @returns
   */
  __propertyPrinters(classType: ClassType): PropertyPrinter[] | undefined {
    if (this.model.properties)
      return Object.entries(this.model.properties).map(
        ([propertyName, options]) => {
          return new PropertyPrinter(
            classType,
            this.modelName,
            propertyName,
            options!
          );
        }
      );

    return;
  }

  /**
   * Print properties
   * @param classType
   * @returns
   */
  __properties(classType: ClassType): string {
    return (
      this.__propertyPrinters(classType)
        ?.map((e) => e.print())
        .join('\n') ?? ''
    );
  }

  /**
   * Print relations
   * @param classType
   * @returns
   */
  __relations(classType: ClassType): string {
    return (
      this.__relationPrinters(classType)
        ?.map((e) => e.print())
        .join('\n') ?? ''
    );
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
      this.importing(),
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
