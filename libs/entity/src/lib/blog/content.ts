import { IContent } from '@webpackages/model';
import {
  IDEntity,
  OwnerRelation,
  StringColumn,
  Entity,
} from '@webpackages/typeorm';
import { Article } from './article';

@Entity()
export class Content extends IDEntity implements IContent<Article> {
  @StringColumn() content!: string;
  @OwnerRelation(Article) article!: Article;
}
