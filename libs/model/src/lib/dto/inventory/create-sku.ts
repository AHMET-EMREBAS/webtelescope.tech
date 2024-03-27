import { ISku } from '../../model';

export interface ICreateSkuDto extends Pick<ISku, 'sku' | 'barcode'> {}
