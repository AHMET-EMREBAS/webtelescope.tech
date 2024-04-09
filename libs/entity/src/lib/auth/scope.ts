import { IScope } from '@webpackages/model';
import { IDEntity, UniqueNameColumn } from '@webpackages/typeorm';
import { Entity } from 'typeorm';

@Entity()
export class Scope extends IDEntity implements IScope {
  @UniqueNameColumn() scope!: string;
}
