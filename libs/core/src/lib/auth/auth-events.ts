export enum AuthEvents {
  FORGOT_PASSWORD_EVENT = 'FORGOT_PASSWORD_EVENT',
}

export type ForgotPasswordEventPayload = {
  username: string;
  securityCode: string;
};
