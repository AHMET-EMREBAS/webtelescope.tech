import { BaseModel } from './base';

export interface MessageModel<User> extends BaseModel {
  message: string;
  toUser: User;
  fromUser: User;
}
