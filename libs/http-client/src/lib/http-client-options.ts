import { OptionsFactory } from '@webpackages/core';
import { AxiosRequestConfig } from 'axios';

export interface HttpRequestConfigFactory
  extends OptionsFactory<AxiosRequestConfig> {}
