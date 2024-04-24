import { IBaseModel } from '../common';

export interface ISample extends IBaseModel {
  name: string;
}

export interface ISampleView {
  sampleId: number;
  sampleName: string;
}

export interface ICreateSampleDto extends Pick<ISample, 'name'> {}

export interface IUpdateSampleDto extends Pick<ISample, 'name'> {}

export interface IQuerySampleDto extends Partial<Pick<ISample, 'name'>> {}
