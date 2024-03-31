import { ITag } from '@webpackages/model';
import { IDEntity, NameColumn, Entity } from '@webpackages/typeorm';

@Entity()
export class Tag extends IDEntity implements ITag {
  @NameColumn() tag!: string;
}
