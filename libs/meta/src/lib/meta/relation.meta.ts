import { Exclude, Expose } from 'class-transformer';

export type RelationView = {
  name: string;
  as: string;
};

export class RelationMeta {
  name!: string;
  type!: 'owner' | 'sub' | 'subs';
  target!: string;
  required?: boolean;
  views?: RelationView[];
}

export class PrintableRelationMeta {
  name!: string;
  type!: 'owner' | 'sub' | 'subs';
  target!: string;
  required?: boolean;
  views?: RelationView[];
}

@Exclude()
export class AllRelationOptions {
  @Expose() type!: 'owner' | 'sub' | 'subs';
  @Expose() target!: string;
  @Expose() required?: boolean;
}
