import { Constructor } from '../printers/common';

export type RelationView = {
  name: string;
  as: string;
};

export class RelationMeta {
  name!: string;
  type!: 'owner' | 'sub' | 'subs';
  target!: Constructor;
  required?: boolean;
  views?: RelationView[];
}
