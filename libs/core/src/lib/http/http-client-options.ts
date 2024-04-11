import { OptionsFactory } from '../factory';
import { AxiosRequestConfig } from 'axios';

export interface HttpRequestConfigFactory
  extends OptionsFactory<AxiosRequestConfig> {}
