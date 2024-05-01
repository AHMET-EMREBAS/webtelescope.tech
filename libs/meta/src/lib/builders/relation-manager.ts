import { PropertyOptions, RelationOptions, RelationType } from '../common-imp';
import { ModelManager } from './model-manager';
import { orderPropertyOptions } from './order-objects';

export enum BuiltinClassNames {
  IID = 'IID',
  IDDto = 'IDDto',
}

export class RelationManager {
  constructor(protected readonly relationOptions: RelationOptions) {}

  protected __isArray() {
    return this.relationOptions.relationType == RelationType.Many
      ? true
      : false;
  }

  protected __modelManager() {
    return new ModelManager(this.relationOptions.model);
  }

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

  toRelationColumn(): Omit<RelationOptions, 'model'> {
    const { relationType: type, required } = this.relationOptions;
    return { relationType: type, required };
  }

  toIEntity(): PropertyOptions {
    return this.__toPropertyOptions({ objectType: BuiltinClassNames.IID });
  }

  toCreate(): PropertyOptions {
    return this.__toPropertyOptions({ objectType: BuiltinClassNames.IDDto });
  }

  toICreate(): PropertyOptions {
    return this.__toPropertyOptions({ objectType: BuiltinClassNames.IID });
  }

  toUpdate(): PropertyOptions {
    return this.__toPropertyOptions({
      objectType: BuiltinClassNames.IDDto,
      required: undefined,
    });
  }

  toIUpdate(): PropertyOptions {
    return this.__toPropertyOptions({
      objectType: BuiltinClassNames.IID,
      required: undefined,
    });
  }

  toQuery(): PropertyOptions[] {
    return this.__modelManager().queryProperties(this.modelName());
  }

  toIQuery(): PropertyOptions[] {
    return this.toQuery();
  }

  /**
   * Return the viewable properties from the model
   * @returns
   */
  toView(): PropertyOptions[] {
    return this.__modelManager().viewProperties();
  }
}
