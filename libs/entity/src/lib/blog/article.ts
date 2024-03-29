import { IArticle } from '@webpackages/model';
import { NameColumn, OwnerRelation, TimestampEntity } from '../common';
import { Entity } from 'typeorm';
import { Blog } from './blog';

@Entity()
export class Article extends TimestampEntity implements IArticle<Blog> {
  @NameColumn() title!: string;
  @OwnerRelation(Blog) blog!: Blog;
}
