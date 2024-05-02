import {
  BarcodeProperty,
  CreateImageModelFor,
  DescriptionProperty,
  ManyRelation,
  Model,
  OneRelation,
  UniqueNameProperty,
} from '../../core';
import { CategoryModel, DepartmentModel } from '../common';

export const ProductModel: Model = {
  modelName: 'Product',
  properties: {
    barcode: BarcodeProperty(),
    name: UniqueNameProperty(),
    description: DescriptionProperty(),
  },
  relations: {
    category: ManyRelation(CategoryModel),
    department: OneRelation(DepartmentModel),
  },
};

export const ProductImage: Model = CreateImageModelFor(ProductModel);
