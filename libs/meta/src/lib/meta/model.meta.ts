import { PropertyMeta } from './property.meta';

import { RelationMeta } from './relation.meta';

export class ModelMeta {
  name!: string;
  properties?: Record<string, PropertyMeta>;
  relations?: Record<string, RelationMeta>;
}
