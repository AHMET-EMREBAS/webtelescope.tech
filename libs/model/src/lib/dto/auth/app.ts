import { IApp } from '../../model';

export interface ICreateAppDto extends Pick<IApp, 'appName'> {}
