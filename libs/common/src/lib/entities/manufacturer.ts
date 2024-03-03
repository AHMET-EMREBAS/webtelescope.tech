import { ITimestampEntity } from './base';

export interface IManufacturer extends ITimestampEntity {
  name: string;
}

export interface ICreateManufacturerDto extends Pick<IManufacturer, 'name'> {}

export interface IUpdateManufacturerDto
  extends Partial<ICreateManufacturerDto> {}
  
