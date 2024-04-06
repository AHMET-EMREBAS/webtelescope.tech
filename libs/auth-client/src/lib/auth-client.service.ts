import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateSubDto, ILoginDto, ILoginResult } from '@webpackages/model';
import { Observable, map } from 'rxjs';
import { setAccessToken, setDeviceId } from './access-token';

@Injectable()
export class AuthClientService {
  constructor(private readonly httpClient: HttpClient) {}

  login(loginDto: ILoginDto): Observable<boolean> {
    return this.httpClient.post<ILoginResult>('api/auth/login', loginDto).pipe(
      map((result) => {
        setAccessToken(result.accessToken);
        setDeviceId(result.deviceId);
        return true;
      })
    );
  }

  logout() {
    return this.httpClient.post('api/auth/logout', {});
  }

  signup(signupDto: ICreateSubDto) {
    return this.httpClient.post('api/auth/signup', signupDto);
  }

  users() {
    return this.httpClient.get('api/users');
  }
}
