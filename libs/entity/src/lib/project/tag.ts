import { ITag } from '@webpackages/model';
import { IDEntity, NameColumn } from '../common';
import { Entity } from 'typeorm';

@Entity()
export class Tag extends IDEntity implements ITag {
  @NameColumn() tag!: string;
}
