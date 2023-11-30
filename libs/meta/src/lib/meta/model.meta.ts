import { KeyOf } from './common';
import { PropertyMeta } from './property.meta';

import { RelationMeta } from './relation.meta';

export class ModelMeta<Model> {
  name!: string;
  properties?: Record<KeyOf<Model>, PropertyMeta>;
  relations?: Record<KeyOf<Model>, RelationMeta>;
  required?: KeyOf<Model>[];
  uniques?: KeyOf<Model>[];
}
