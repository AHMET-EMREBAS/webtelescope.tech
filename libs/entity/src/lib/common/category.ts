import { ICategory } from '@webpackages/model';
import { Entity, IDEntity, StringColumn } from '@webpackages/typeorm';

@Entity()
export class Category extends IDEntity implements ICategory {
  @StringColumn({ unique: true }) category!: string;
}
