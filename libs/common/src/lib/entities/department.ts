import { IBasicEntity } from './base';

export interface IDepartment extends IBasicEntity {
  name: string;
}
export interface ICreateDepartmentDto extends Pick<IDepartment, 'name'> {}

export interface IUpdateDepartmentDto extends Partial<ICreateDepartmentDto> {}
