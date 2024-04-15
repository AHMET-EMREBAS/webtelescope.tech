import { HttpInterceptorFn } from '@angular/common/http';
import { getAccessToken } from './local-store';
import { AuthEnums } from '@webpackages/common';

export interface AuthServiceInterceptorOptions {
  baseURL: string;
  orgname: string;
  oauthApiKey: string;
  appName: string;
}
export function createClientAuthServiceHttpInterceptor(
  options: AuthServiceInterceptorOptions
): HttpInterceptorFn {
  const { appName, baseURL, oauthApiKey, orgname } = options;
  return (req, next) => {
    const headers = req.headers
      .append('authorization', `Bearer ${getAccessToken()}`)
      .append(AuthEnums.X_ORGNAME, orgname)
      .append(AuthEnums.X_OAUTH_API_KEY, oauthApiKey)
      .append(AuthEnums.X_APP_NAME, appName);
    const nReq = req.clone({
      url: [baseURL, req.url].join('/'),
      headers,
    });
    return next(nReq);
  };
}
