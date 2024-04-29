import { PropertyOptions, RelationOptions, RelationType } from '../meta';
import { ModelManager } from './model-manager';

export enum BuiltinClassNames {
  IID = 'IDD',
  IDDto = 'IDDto',
}

export class RelationManager {
  constructor(protected readonly relationOptions: RelationOptions) {}

  protected __isArray() {
    return this.relationOptions.type == RelationType.Many ? true : false;
  }

  protected __modelManager() {
    return new ModelManager(this.relationOptions.model);
  }

  protected __toPropertyOptions(
    options?: Partial<PropertyOptions>
  ): PropertyOptions {
    const { description: rDescription, required: rRequired } =
      this.relationOptions;
    const result = {
      required: rRequired,
      description: rDescription,
      objectType: 'IDDto',
      ...options,
      type: 'object',
      isArray: this.__isArray(),
    };

    const { type, objectType, required, isArray, description } = result;

    const orderedResult = {
      type,
      objectType,
      required,
      isArray,
      description,
    } as PropertyOptions;

    return orderedResult;
  }

  modelName() {
    return this.relationOptions.model.modelName;
  }

  toRelationColumn(): Omit<RelationOptions, 'model'> {
    const { type, required } = this.relationOptions;
    return { type, required };
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
