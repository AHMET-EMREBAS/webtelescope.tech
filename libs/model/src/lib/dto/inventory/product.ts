import { IProduct } from '../../model';

export interface ICreateProductDto
  extends Pick<IProduct, 'productName' | 'productDescription' | 'barcode'> {}
