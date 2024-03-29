import { IContent } from '@webpackages/model';
import { IDEntity, OwnerRelation, TextColumn } from '../common';
import { Article } from './article';
import { Entity } from 'typeorm';

@Entity()
export class Content extends IDEntity implements IContent<Article> {
  @TextColumn() content!: string;
  @OwnerRelation(Article) article!: Article;
}
