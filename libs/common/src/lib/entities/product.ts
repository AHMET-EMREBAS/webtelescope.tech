import { IBasicEntity, IID } from './base';

export interface IProduct<C, D, M> extends IBasicEntity {
  name: string;
  description: string;
  make: string;
  model: string;
  upc: string;
  category: C;
  department: D;
  manufacturer: M;
}

export interface ICreateProductDto
  extends Pick<
    IProduct<IID, IID, IID>,
    | 'category'
    | 'department'
    | 'description'
    | 'make'
    | 'manufacturer'
    | 'model'
    | 'name'
    | 'upc'
  > {}

export interface IUpdateProductDto extends Partial<ICreateProductDto> {}
