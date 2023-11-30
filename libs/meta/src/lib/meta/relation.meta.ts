export type RelationView = {
  name: string;
  as: string;
};

export class RelationMeta {
  type!: 'owner' | 'sub' | 'subs';
  target!: string;
  required?: boolean;
  views?: RelationView[];
}
