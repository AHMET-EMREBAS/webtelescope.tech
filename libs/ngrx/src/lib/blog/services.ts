import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceElementsFactory,
  EntityDataModuleConfig,
} from '@ngrx/data';
import { EntityCollectionService } from '../common';
import { HttpClient } from '@angular/common/http';
import { IArticle, IBlog, IContent, IID } from '@webpackages/model';

export const BlogEntityDataModuleConfig: EntityDataModuleConfig = {
  pluralNames: {
    Blog: 'Blogs',
    Content: 'Contents',
    Article: 'Articles',
  },
  entityMetadata: {
    Blog: {},
    Article: {},
    Content: {},
  },
};
@Injectable()
export class BlogService extends EntityCollectionService<IBlog<IID>> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Blog', factory, httpClient);
  }
}

@Injectable()
export class ArticleService extends EntityCollectionService<IArticle<IID>> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Article', factory, httpClient);
  }
}

@Injectable()
export class ContentService extends EntityCollectionService<IContent<IID>> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Content', factory, httpClient);
  }
}
