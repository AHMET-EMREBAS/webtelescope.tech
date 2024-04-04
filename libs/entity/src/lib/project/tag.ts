import { ITag } from '@webpackages/model';
import { IDEntity, StringColumn, Entity } from '@webpackages/typeorm';

@Entity()
export class Tag extends IDEntity implements ITag {
  @StringColumn() tag!: string;
}
