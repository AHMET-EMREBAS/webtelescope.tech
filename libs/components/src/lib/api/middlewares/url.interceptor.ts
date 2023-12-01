/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const UrlInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const url = req.url;
  const apiReq = req.clone({ url: 'http://localhost:3000/' + url });
  return next(apiReq);
};
