import { HttpInterceptorFn } from '@angular/common/http';
import { getAccessToken } from './access-token';

export function createAuthInterceptor(baseURL: string): HttpInterceptorFn {
  return (req, next) => {
    const headers = req.headers.append(
      'authorization',
      `Bearer ${getAccessToken()}`
    )!;
    const nReq = req.clone({
      url: [baseURL, req.url].join('/'),
      headers,
    });
    return next(nReq);
  };
}
