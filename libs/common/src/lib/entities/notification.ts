import { IID, IOwnedEntity } from './base';

export interface INotification<O> extends IOwnedEntity<O> {
  title: string;
  message: string;
  link: string;
  read: boolean;
}

export interface ICreateNotificationDto
  extends Pick<INotification<IID>, 'title' | 'message' | 'link' | 'read'> {}

export interface IUpdateNotificationDto
  extends Partial<ICreateNotificationDto> {}
