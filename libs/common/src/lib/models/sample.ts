import { IID } from './_id';

export interface ISample extends IID {
  name: string;
}

export interface ICreateSampleDto extends Pick<ISample, 'name'> {}

export interface IUpdateSampleDto extends Pick<ISample, 'name'> {}

export interface IQuerySampleDto extends Partial<Pick<ISample, 'name'>> {}
