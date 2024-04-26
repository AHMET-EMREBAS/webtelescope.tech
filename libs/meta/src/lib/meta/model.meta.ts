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
  /**
   * Name of the model
   */
  modelName: M;
  /**
   * Record of model properties
   */
  properties?: Partial<Record<PropertyNames, PropertyOptions<StringFormat, M>>>;

  /**
   * Record of model relations
   */
  relations?: Partial<Record<RelationNames, RelationOptions>>;
};
