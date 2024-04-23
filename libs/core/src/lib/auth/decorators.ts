import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthNames } from './auth-names';

export function ApiKeyAuth() {
  return applyDecorators(
    ApiBearerAuth(AuthNames.API_KEY_SECURITY_NAME)
    //@todo
    //  UseGuards(
    //     // ...Add guards here
    // )
  );
}

export function CookieAuth() {
  return applyDecorators(
    ApiBearerAuth(AuthNames.COOKIE_SECURITY_NAME)
    //@todo
    //  UseGuards(
    //     // ...Add guards here
    // )
  );
}

export function CredentialsAuth() {
  return applyDecorators(
    ApiBearerAuth(AuthNames.CREDENTIALS_SECURITY_NAME)
    //@todo
    //  UseGuards(
    //     // ...Add guards here
    // )
  );
}
