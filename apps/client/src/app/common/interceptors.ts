import { HttpInterceptorFn } from '@angular/common/http';

export const DevInterceptor: HttpInterceptorFn = (req, next) => {
  const prefix = req.url.includes('api')
    ? `http://localhost:3000/`
    : `http://localhost:3000/api/`;
  const cloned = req.clone({ url: `${prefix}${req.url}` });
  return next(cloned);
};
export const APP_INTERCEPTORS: HttpInterceptorFn[] = [DevInterceptor];
