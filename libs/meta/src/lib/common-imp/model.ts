import { PropertyOptions } from './property';
import { RelationOptions } from './relation';

export type Model = {
  modelName: string;
  properties?: Record<string, PropertyOptions>;
  relations?: Record<string, RelationOptions>;
  description?: string;
};
