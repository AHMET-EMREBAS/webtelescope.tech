/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosResponse as AxRes, AxiosRequestConfig } from 'axios';

import { HttpRequestConfigFactory } from './http-client-options';

export class HttpClientService {
  private readonly options: AxiosRequestConfig;

  constructor(protected readonly optionsFactory?: HttpRequestConfigFactory) {
    this.options = this.optionsFactory?.options() ?? {};
  }

  async post<Body>(url: string, body: any) {
    return await axios.post<any, AxRes<Body>>(url, body, this.options);
  }

  async get<Body>(url: string) {
    return await axios.get<any, AxRes<Body>>(url, this.options);
  }

  async put<Body>(url: string, body: any) {
    return await axios.put<any, AxRes<Body>>(url, body, this.options);
  }

  async delete<Body>(url: string) {
    return await axios.delete<any, AxRes<Body>>(url, this.options);
  }
}
