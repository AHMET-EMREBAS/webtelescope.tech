import { Controller } from '@nestjs/common';
import { IAuthController } from '@webpackages/common';
import {
  LoginDto,
  LoginResponse,
  UpdatePasswordDto,
  ForgotPasswordDto,
  LoginWithCodeDto,
  CreateSubDto,
  UpdateResult,
  Body,
} from '@webpackages/dto';
import {
  ISession,
  MessageResponse,
  IUser,
  IOrg,
  IRole,
  IPermission,
} from '@webpackages/model';
import { AuthClientService } from './auth.service';
import {} from '@webpackages/common';
import { AuthorizationParam, SessionParam } from '@webpackages/auth';
import { Query } from '@webpackages/dto';

@Controller()
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthClientService) {}

  async login(
    @Query() loginDto: LoginDto,
    @AuthorizationParam() accessToken: string,
    @SessionParam() session: ISession
  ): Promise<LoginResponse> {
    return {
      accessToken,
      deviceId: session.deviceId,
    };
  }

  async logout(session: ISession): Promise<MessageResponse> | never {
    return { message: 'Deleted the current session.' };
  }
  logoutAllDevices(session: ISession): Promise<MessageResponse> {
    throw new Error('Method not implemented.');
  }
  hasSession(): Promise<MessageResponse> {
    throw new Error('Method not implemented.');
  }
  updatePassword(
    @SessionParam() session: ISession,
    @Body() passwordDto: UpdatePasswordDto
  ): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }
  forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
    user: IUser<IOrg, IRole<IPermission>>
  ): Promise<MessageResponse> {
    throw new Error('Method not implemented.');
  }
  loginWithCode(__: LoginWithCodeDto, accessToken: string): LoginResponse {
    throw new Error('Method not implemented.');
  }
  signup(signupDto: CreateSubDto): Promise<MessageResponse> {
    throw new Error('Method not implemented.');
  }
}
