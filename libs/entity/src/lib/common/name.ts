import { IName } from '@webpackages/model';
import { IDEntity } from './id';
import { NameColumn } from './columns';

export class NameEntity extends IDEntity implements IName {
  @NameColumn()
  name!: string;
}
