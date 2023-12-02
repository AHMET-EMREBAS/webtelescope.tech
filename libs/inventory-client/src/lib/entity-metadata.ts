import { EntityMetadataMap } from '@ngrx/data';

export const inventoryEntityMetadata: EntityMetadataMap = {
  Category: {},
  Permission: {},
  PriceLevel: {},
  Price: {},
  Product: {},
  Quantity: {},
  Role: {},
  Sku: {},
  Store: {},
  User: {},
};

export const inventoryPluralNames = {
  Category: 'Categories',
  Permission: 'Permissions',
  Price: 'Prices',
  PriceLevel: 'PriceLevels',
  Product: 'Products',
  Quantity: 'Quantities',
  Role: 'Roles',
  Sku: 'Skus',
  Store: 'Stores',
  User: 'Users',
};
