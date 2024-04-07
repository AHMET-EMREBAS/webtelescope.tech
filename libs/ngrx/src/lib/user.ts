import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IID, IUser } from '@webpackages/model';
import { EntityCollectionService } from './common';

@Injectable()
export class UserService extends EntityCollectionService<IUser<IID, IID>> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('User', factory, httpClient);
  }
}
