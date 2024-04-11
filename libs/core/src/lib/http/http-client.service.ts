/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthEnums } from '../auth';
import { InjectHttpClientOptions } from './http-config.providers';
import { HttpClientModuleOptions } from './http-client-options';

import { HttpClientServiceResponse as HttpResponse } from './http-response';

@Injectable()
export class HttpClientService {
  constructor(
    @InjectHttpClientOptions()
    private readonly httpClientModuleOptions: HttpClientModuleOptions
  ) {}

  private httpConfig(): AxiosRequestConfig {
    const { appname, bearerToken, oauthApiKey, orgname } =
      this.httpClientModuleOptions;
    return {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        [AuthEnums.X_APP_NAME]: appname,
        [AuthEnums.X_ORGNAME]: orgname,
        [AuthEnums.X_OAUTH_API_KEY]: oauthApiKey,
      },
      transformResponse: (res: AxiosResponse) => {
        return {
          status: res.status,
          body: res.data,
          message: res.statusText,
        };
      },
    };
  }

  private resolveURL(fragment: string) {
    return new URL(fragment, this.httpClientModuleOptions.baseURL).toString();
  }

  async post<Body>(fragment: string, body: any) {
    return await axios.post<any, HttpResponse<Body>>(
      this.resolveURL(fragment),
      body,
      this.httpConfig()
    );
  }

  async get<Body>(fragment: string) {
    return await axios.get<any, HttpResponse<Body>>(
      this.resolveURL(fragment),
      this.httpConfig()
    );
  }

  async put<Body>(fragment: string, body: any) {
    return await axios.put<any, HttpResponse<Body>>(
      this.resolveURL(fragment),
      body,
      this.httpConfig()
    );
  }

  async delete<Body>(fragment: string) {
    return await axios.delete<any, HttpResponse<Body>>(
      this.resolveURL(fragment),
      this.httpConfig()
    );
  }
}
