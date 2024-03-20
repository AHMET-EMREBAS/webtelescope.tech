import { Property, RelationProperty } from './property';

export type Model<K extends string = string> = {
  type: string;
  properties: Partial<Record<K, Property>>;
  relations?: Partial<Record<K, RelationProperty>>;
  unique?: Partial<K>[];
  required?: Partial<K>[];
  array?: string[];
};


