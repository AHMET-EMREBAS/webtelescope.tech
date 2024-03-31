import { IContent } from '@webpackages/model';
import {
  IDEntity,
  OwnerRelation,
  TextColumn,
  Entity,
} from '@webpackages/typeorm';
import { Article } from './article';

@Entity()
export class Content extends IDEntity implements IContent<Article> {
  @TextColumn() content!: string;
  @OwnerRelation(Article) article!: Article;
}
