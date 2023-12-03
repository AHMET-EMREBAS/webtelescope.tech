import { Repository } from 'typeorm';
import {
  Price,
  PriceLevel,
  Product,
  ProductCategory,
  ProductDepartment,
  Quantity,
  Sku,
  Store,
} from '../entities';
import { BaseService } from './__base-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductCategoryService extends BaseService<ProductCategory> {
  constructor(
    @InjectRepository(ProductCategory)
    repo: Repository<ProductCategory>
  ) {
    super(repo);
  }
}

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    repo: Repository<Product>
  ) {
    super(repo);
  }
}

@Injectable()
export class SkuService extends BaseService<Sku> {
  constructor(
    @InjectRepository(Sku)
    repo: Repository<Sku>
  ) {
    super(repo);
  }
}

@Injectable()
export class ProductDepartmentService extends BaseService<ProductDepartment> {
  constructor(
    @InjectRepository(ProductDepartment)
    repo: Repository<ProductDepartment>
  ) {
    super(repo);
  }
}

@Injectable()
export class StoreService extends BaseService<Store> {
  constructor(
    @InjectRepository(Store)
    repo: Repository<Store>
  ) {
    super(repo);
  }
}

@Injectable()
export class PriceLevelService extends BaseService<PriceLevel> {
  constructor(
    @InjectRepository(PriceLevel)
    repo: Repository<PriceLevel>
  ) {
    super(repo);
  }
}

@Injectable()
export class PriceService extends BaseService<Price> {
  constructor(
    @InjectRepository(Price)
    repo: Repository<Price>
  ) {
    super(repo);
  }
}

@Injectable()
export class QuantityService extends BaseService<Quantity> {
  constructor(
    @InjectRepository(Quantity)
    repo: Repository<Quantity>
  ) {
    super(repo);
  }
}
