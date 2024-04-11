export interface MessageResponse {
  message: string;
}

export interface ErrrorResponse<T = string> {
  message: T;
  error: string;
  statusCode: number;
}
