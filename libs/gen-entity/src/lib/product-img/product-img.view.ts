import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IProductImgView } from '@webpackages/gen-model';
import { ProductImg } from './product-img.entity';
import { Product } from '../product/product.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('productImg.id', 'productImgId')
      .addSelect('productImg.description', 'description')
      .addSelect('productImg.checked', 'checked')
      .addSelect('product.barcode', 'productBarcode')
      .addSelect('product.name', 'productName')
      .addSelect('product.description', 'productDescription')
      .from(ProductImg, 'productImg')
      .leftJoin(Product, 'product', 'product.id = productImg.productId');
  },
})
export class ProductImgView implements IProductImgView {
  /**
   * Image url
   */
  @ViewColumn() url!: string;
  @ViewColumn() description!: string;
  @ViewColumn() productBarcode!: string;
  @ViewColumn() productName!: string;
  @ViewColumn() productDescription!: string;
}
