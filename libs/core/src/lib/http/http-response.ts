/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpClientServiceResponse<Body = Record<string, any>> = {
  status: number;
  body: Body;
  message: string;
};
