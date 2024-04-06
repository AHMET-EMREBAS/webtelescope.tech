import { HttpInterceptorFn } from '@angular/common/http';
import { getAccessToken } from './access-token';

export function createAuthInterceptor(
  baseAuthServiceURL: string
): HttpInterceptorFn {
  return (req, next) => {
    const headers = req.headers.append(
      'authorization',
      `Bearer ${getAccessToken()}`
    )!;
    const nReq = req.clone({
      url: [baseAuthServiceURL, req.url].join('/'),
      headers,
    });
    return next(nReq);
  };
}
