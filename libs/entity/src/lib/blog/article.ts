import { IArticle } from '@webpackages/model';
import {
  NameColumn,
  OwnerRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { Blog } from './blog';

@Entity()
export class Article extends TimestampEntity implements IArticle<Blog> {
  @NameColumn() title!: string;
  @OwnerRelation(Blog) blog!: Blog;
}
