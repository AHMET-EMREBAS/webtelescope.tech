import { Exclude, Expose } from 'class-transformer';

export class RelationMeta {
  name!: string;
  type!: 'owner' | 'sub' | 'subs';
  target!: string;
  required?: boolean;
  views?: Record<string, string>;
}

export class PrintableRelationMeta {
  name!: string;
  type!: 'owner' | 'sub' | 'subs';
  target!: string;
  required?: boolean;
  views?: Record<string, string>;
}

@Exclude()
export class AllRelationOptions {
  @Expose() type!: 'owner' | 'sub' | 'subs';
  @Expose() target!: string;
  @Expose() required?: boolean;
}
