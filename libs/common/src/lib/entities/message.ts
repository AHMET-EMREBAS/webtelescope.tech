import { IID, IOwnedEntity } from './base';

export interface IMessage<T, O, F> extends IOwnedEntity<O> {
  to: T;
  message: string;
  attachments: F[];
}

export interface ICreateMessageDto
  extends Pick<
    IMessage<IID, IID, IID>,
    'attachments' | 'message' | 'owner' | 'to'
  > {}

export interface IUpdateMessageDto extends Partial<ICreateMessageDto> {}
