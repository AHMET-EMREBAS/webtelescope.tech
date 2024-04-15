import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ICreateSubDto,
  ICreateSubTypeDto,
  ILoginDto,
  ILoginResult,
  ILoginWithCodeDto,
} from '@webpackages/model';
import { Observable, catchError, map } from 'rxjs';
import { setAccessToken, setDeviceId } from './local-store';
import { AuthPath } from '@webpackages/common';

const AP = new AuthPath('api/auth');

@Injectable()
export class AuthClientService {
  constructor(private readonly httpClient: HttpClient) {}

  login(loginDto: ILoginDto): Observable<boolean> {
    return this.httpClient.post<ILoginResult>(AP.Login, loginDto).pipe(
      catchError((err, caught) => {
        return caught;
      }),
      map((result) => {
        setAccessToken(result.accessToken);
        setDeviceId(result.deviceId);
        return true;
      })
    );
  }

  loginWithCode(loginDto: ILoginWithCodeDto): Observable<boolean> {
    return this.httpClient.post<ILoginResult>(AP.LoginWithCode, loginDto).pipe(
      map((result) => {
        setAccessToken(result.accessToken);
        setDeviceId(result.deviceId);
        return true;
      })
    );
  }

  hasSession() {
    return this.httpClient.get(AP.HasPermission);
  }

  logout() {
    return this.httpClient.get(AP.Logout);
  }

  logoutAll() {
    return this.httpClient.get(AP.LogoutAll);
  }

  fogotPassword() {
    return this.httpClient.get(AP.ForgotPassWord);
  }

  updatePassword() {
    return this.httpClient.get(AP.UpdatePassword);
  }

  signup(signupDto: ICreateSubDto) {
    return this.httpClient.post(AP.Signup, signupDto);
  }

  createNewSubType(body: ICreateSubTypeDto) {
    return this.httpClient.post('api/sub-type', body);
  }
}
