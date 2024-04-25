import { __PropertyOptions } from './property.meta';
import { RelationProperty } from './relation.meta';

export type __Model<
  M extends string,
  PropertyNames extends string,
  RelationNames extends string,
  StringFormat extends string
> = {
  modelName: M;
  properties: Partial<
    Record<PropertyNames, __PropertyOptions<StringFormat, M>>
  >;
  relations: Partial<Record<RelationNames, RelationProperty<M>>>;
};

export type Model = __Model<string, string, string, string>;
