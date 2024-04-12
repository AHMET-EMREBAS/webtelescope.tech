import { Controller, Get, Post, applyDecorators } from '@nestjs/common';
import {
  ConfigureResource,
  IAuthResourceBuilder,
  ResouceName,
  Scope,
} from '@webpackages/core';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ControllerConfiguration } from '@webpackages/core';

export class AuthResourceBuilder implements IAuthResourceBuilder {
  constructor(
    public readonly config?: ControllerConfiguration<IAuthResourceBuilder>
  ) {}

  Controller(): ClassDecorator {
    return applyDecorators(
      ApiTags('Auth'),
      ResouceName('Auth'),
      Controller('auth'),
      Scope('Auth'),
      ConfigureResource(this.config?.Controller)
    );
  }

  Login(): PropertyDecorator {
    return applyDecorators(
      ApiOperation({
        summary: 'Login with credentials, username and password',
      }),
      Post('login'),
      ApiInternalServerErrorResponse(),
      ApiUnauthorizedResponse({
        description: 'Username or password is wrong!',
      }),
      ApiOkResponse({ description: 'Successfully created a session' }),
      ConfigureResource(this.config?.Login)
    );
  }

  LoginWithCode(): PropertyDecorator {
    return applyDecorators(
      ApiOperation({ summary: 'Login with securityCode and useranme' }),
      Get('login-with-code'),
      ConfigureResource(this.config?.LoginWithCode)
    );
  }

  Logout(): PropertyDecorator {
    return applyDecorators(
      ApiOperation({ summary: 'Logout | Delete the current session' }),
      Get('logout'),
      ConfigureResource(this.config?.Logout)
    );
  }

  LogoutAll(): PropertyDecorator {
    return applyDecorators(
      ApiOperation({ summary: 'Logout All Devices | Delete all sessions' }),
      Get('logout-all-devices'),
      ConfigureResource(this.config?.LogoutAll)
    );
  }

  HasSession(): PropertyDecorator {
    return applyDecorators(
      ApiOperation({ summary: 'Check the user has a session or not' }),
      Get('has-session'),
      ConfigureResource(this.config?.HasSession)
    );
  }

  ForgotPassword(): PropertyDecorator {
    return applyDecorators(
      ApiOperation({ summary: 'Request password reset link' }),
      Post('forgot-password'),
      ConfigureResource(this.config?.ForgotPassword)
    );
  }

  UpdatePassword(): PropertyDecorator {
    return applyDecorators(
      ApiOperation({ summary: 'Update password' }),
      ApiOkResponse({ description: 'Successfully updated password' }),
      ApiUnprocessableEntityResponse({
        description: 'Password is not strong enough',
      }),
      ApiUnauthorizedResponse({ description: 'There is no valid session' }),
      Post('update-password'),
      ConfigureResource(this.config?.UpdatePassword)
    );
  }

  SignUp(): PropertyDecorator {
    return applyDecorators(
      ApiOperation({ summary: 'Signup' }),
      Post('signup'),
      ConfigureResource(this.config?.SignUp)
    );
  }
}
