import { IArticle } from '@webpackages/model';
import {
  StringColumn,
  OwnerRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { Blog } from './blog';

@Entity()
export class Article extends TimestampEntity implements IArticle<Blog> {
  @StringColumn() title!: string;
  @OwnerRelation(Blog) blog!: Blog;
}
