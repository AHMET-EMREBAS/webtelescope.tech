import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceElementsFactory,
  EntityDataModuleConfig,
} from '@ngrx/data';
import { EntityCollectionService } from '../common';
import { HttpClient } from '@angular/common/http';
import {
  ICategory,
  IDepartment,
  IID,
  IPrice,
  IPriceLevel,
  IProduct,
  IQuantity,
  ISku,
  IStore,
} from '@webpackages/model';

export const InventoryEntityDataModuleConfig: EntityDataModuleConfig = {
  pluralNames: {
    Product: 'Products',
    Sku: 'Skus',
    Category: 'Categories',
    Department: 'Departments',
    Store: 'Stores',
    Price: 'Prices',
    PriceLevel: 'PriceLevels',
    Quantity: 'Quantities',
  },
  entityMetadata: {
    Product: {},
    Sku: {},
    Category: {},
    Department: {},
    Store: {},
    Price: {},
    PriceLevel: {},
    Quantity: {},
  },
};

@Injectable()
export class ProductService extends EntityCollectionService<IProduct> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Product', factory, httpClient);
  }
}
@Injectable()
export class SkuService extends EntityCollectionService<ISku> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Sku', factory, httpClient);
  }
}
@Injectable()
export class CategoryService extends EntityCollectionService<ICategory> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Category', factory, httpClient);
  }
}

@Injectable()
export class DepartmentService extends EntityCollectionService<IDepartment> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Department', factory, httpClient);
  }
}
@Injectable()
export class StoreService extends EntityCollectionService<IStore<IID>> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Store', factory, httpClient);
  }
}
@Injectable()
export class PriceService extends EntityCollectionService<IPrice<IID, IID>> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Price', factory, httpClient);
  }
}
@Injectable()
export class PriceLevelService extends EntityCollectionService<IPriceLevel> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('PriceLevel', factory, httpClient);
  }
}
@Injectable()
export class QuantityService extends EntityCollectionService<
  IQuantity<IID, IID>
> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Quantity', factory, httpClient);
  }
}
