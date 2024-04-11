import { createProvider } from '../providers';

// export const [provideAxiosBaseURL, InjectAxiosBaseURL, getAxiosBaseURLToken] =
//   createProvider('AxiosBaseURL');

// export const [provideBearerToken, InjectBearerToken, getBearerToken] =
//   createProvider('ApiBearerToken');

// export const [provideOAuthApiKey, InjectOAuthApiKey, getOAuthApiKeyToken] =
//   createProvider('OAUthApiKey');

// export const [provideOrgname, InjectOrgname, getOrgnameToken] =
//   createProvider('Orgname');

// export const [provideAppname, InjectAppname, getAppnameToken] =
//   createProvider('Appname');

export const [
  provideHttpClientOptions,
  InjectHttpClientOptions,
  getHttpClientOptionsToken,
] = createProvider('HttpClientModuleOptions');
