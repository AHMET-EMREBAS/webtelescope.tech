import { PropertySchema } from './property-schema';
import { RelationSchema } from './relation-schema';
import { ViewSchema } from './view-schema';

export interface EntitySchema<
  ClassName extends string,
  PropertyName extends string
> {
  extends?: EntitySchema<ClassName, PropertyName>[];

  properties: Partial<Record<PropertyName, PropertySchema<ClassName>>>;
  relations?: Partial<
    Record<PropertyName, RelationSchema<ClassName, PropertyName>>
  >;
  readDto?: PropertyName[];
  createDto?: PropertyName[];
  updateDto?: PropertyName[];
  viewDto?: ViewSchema<ClassName, PropertyName>[];

  required?: PropertyName[];
  unique?: PropertyName[];
}
