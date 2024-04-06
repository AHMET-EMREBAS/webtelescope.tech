import { IArticle } from '@webpackages/model';
import {
  OwnerRelation,
  TimestampEntity,
  Entity,
  UniqueNameColumn,
} from '@webpackages/typeorm';
import { Blog } from './blog';

@Entity()
export class Article extends TimestampEntity implements IArticle<Blog> {
  @UniqueNameColumn() title!: string;
  @OwnerRelation(Blog) blog!: Blog;
}
