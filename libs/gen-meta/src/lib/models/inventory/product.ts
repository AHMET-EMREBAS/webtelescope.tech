import {
  BarcodeProperty,
  CreateImageModelFor,
  DescriptionProperty,
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
    category: OneRelation(CategoryModel),
    department: OneRelation(DepartmentModel),
  },
};

export const ProductImage: Model = CreateImageModelFor(ProductModel);
