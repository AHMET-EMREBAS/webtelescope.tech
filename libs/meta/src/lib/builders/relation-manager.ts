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
    const { description, required } = this.relationOptions;
    return {
      required,
      description,
      objectType: 'IDDto',
      ...options,
      type: 'object',
      isArray: this.__isArray(),
    };
  }

  toColumn(): RelationOptions {
    return { ...this.relationOptions };
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
      required: false,
    });
  }

  toIUpdate(): PropertyOptions {
    return this.__toPropertyOptions({
      objectType: BuiltinClassNames.IID,
      required: false,
    });
  }

  toQuery(): PropertyOptions[] {
    return this.__modelManager().queryProperties();
  }

  toIQuery(): PropertyOptions[] {
    return this.toQuery();
  }

  toView(): PropertyOptions[] {
    return this.__modelManager().viewProperties();
  }
}
