import { PrintablePropertyMeta, PropertyMeta } from './property.meta';

import { PrintableRelationMeta, RelationMeta } from './relation.meta';

export class ModelMeta {
  name!: string;
  properties?: Record<string, PropertyMeta>;
  relations?: Record<string, RelationMeta>;
}

export class PrintableModelMeta {
  name!: string;
  properties?: Record<string, PrintablePropertyMeta>;
  relations?: Record<string, PrintableRelationMeta>;
}
