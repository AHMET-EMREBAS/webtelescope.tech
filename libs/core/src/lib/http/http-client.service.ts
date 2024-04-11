/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { createProvider } from '../providers';
import axios, { AxiosRequestConfig } from 'axios';
import { AuthEnums } from '../auth';

export const [provideAxiosBaseURL, InjectAxiosBaseURL, getAxiosBaseURLToken] =
  createProvider('AxiosBaseURL');

export const [provideBearerToken, InjectBearerToken, getBearerToken] =
  createProvider('ApiBearerToken');

export const [
  provideOrganizationName,
  InjectOrganizationName,
  getOrganizationNameToken,
] = createProvider('OrganizationName');

@Injectable()
export class HttpClientService {
  constructor(
    @InjectAxiosBaseURL() protected readonly baseURL: string,
    @InjectBearerToken() protected readonly bearerToken: string,
    @InjectOrganizationName() protected readonly organizationName: string
  ) {}

  private httpConfig(): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${this.bearerToken}`,
        [AuthEnums.X_ORGNAME]: this.organizationName,
      },
    };
  }

  private resolveURL(fragment: string) {
    return new URL(fragment, this.baseURL).toString();
  }

  async post(fragment: string, body: any) {
    return await axios
      .post(this.resolveURL(fragment), body, this.httpConfig())
      .then((response) => {
        return response.data;
      });
  }

  async get(fragment: string) {
    return await axios
      .get(this.resolveURL(fragment), this.httpConfig())
      .then((response) => {
        return response.data;
      });
  }

  async put(fragment: string, body: any) {
    return await axios
      .put(this.resolveURL(fragment), body, this.httpConfig())
      .then((response) => {
        return response.data;
      });
  }

  async delete(fragment: string) {
    return await axios
      .delete(this.resolveURL(fragment), this.httpConfig())
      .then((response) => {
        return response.data;
      });
  }
}
