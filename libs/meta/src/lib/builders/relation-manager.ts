import { PropertyOptions, RelationOptions, RelationType } from '../common-imp';
import { ModelManager } from './model-manager';
import { orderPropertyOptions } from './order-objects';

export enum BuiltinClassNames {
  IID = 'IID',
  IDDto = 'IDDto',
  BaseEntity = 'BaseEntity',
  IBaseEntity = 'IBaseEntity',
}

export class RelationManager {
  constructor(protected readonly relationOptions: RelationOptions) {}

  /**
   * Check the relation is Many or One (isArray or not)
   */
  protected __isArray() {
    return this.relationOptions.relationType == RelationType.Many
      ? true
      : false;
  }

  /**
   * Creates a  new model manager for the relation's model
   */
  protected __modelManager() {
    return new ModelManager(this.relationOptions.model);
  }

  /**
   * Convert the relation options into {@link PropertyOptions}
   * When we convert relation into property.
   * The tye will be always an IDDto.
   * @param options
   * @returns
   */
  protected __toPropertyOptions(
    options?: Partial<PropertyOptions>
  ): PropertyOptions {
    const { description, required } = this.relationOptions;
    return orderPropertyOptions({
      required,
      description,
      objectType: 'IDDto',
      ...options,
      type: 'object',
      isArray: this.__isArray(),
    });
  }

  modelName() {
    return this.relationOptions.model.modelName;
  }

  /**
   * Convert relation options Relation column options.
   * This method is not actually converts but pick required properties for the relation-column
   */
  toRelationColumn(): Omit<RelationOptions, 'model'> {
    const { relationType, required } = this.relationOptions;
    return { relationType, required };
  }

  /**
   * Convert the relation option into IEntity property option
   */
  toIEntity(): PropertyOptions {
    return this.__toPropertyOptions({ objectType: BuiltinClassNames.IID });
  }
  /**
   * Convert the relation options into CreateDto property option
   */
  toCreate(): PropertyOptions {
    return this.__toPropertyOptions({ objectType: BuiltinClassNames.IDDto });
  }

  /**
   * Convert the relation options into ICreate property option
   */
  toICreate(): PropertyOptions {
    return this.__toPropertyOptions({ objectType: BuiltinClassNames.IID });
  }

  /**
   * Convert the relation options into UpdateDto property option
   */
  toUpdate(): PropertyOptions {
    return this.__toPropertyOptions({
      objectType: BuiltinClassNames.IDDto,
      required: undefined,
    });
  }

  /**
   * Convert the relation options into IUpdate property option
   */
  toIUpdate(): PropertyOptions {
    return this.__toPropertyOptions({
      objectType: BuiltinClassNames.IID,
      required: undefined,
    });
  }

  /**
   * Convert the relation options into QueryDto property option
   */
  toQuery(): PropertyOptions[] {
    return this.__modelManager().queryProperties(this.modelName());
  }

  /**
   * Convert the relation options into IQuery property option
   */
  toIQuery(): PropertyOptions[] {
    return this.toQuery();
  }

  /**
   * Return the viewable properties from the model
   */
  toView(): PropertyOptions[] {
    return this.__modelManager().viewProperties();
  }
}
