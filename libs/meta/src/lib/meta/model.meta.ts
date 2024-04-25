import { PropertyOptions } from './property.meta';
import { RelationOptions } from './relation.meta';

/**
 * Configurable Model metadata
 */
export type Model<
  M extends string = string,
  PropertyNames extends string = string,
  RelationNames extends string = string,
  StringFormat extends string = string
> = {
  modelName: M;
  properties?: Partial<Record<PropertyNames, PropertyOptions<StringFormat, M>>>;
  relations?: Partial<
    Record<
      RelationNames,
      RelationOptions<
        M,
        Model<M, PropertyNames, RelationNames, StringFormat>
      >
    >
  >;
};



