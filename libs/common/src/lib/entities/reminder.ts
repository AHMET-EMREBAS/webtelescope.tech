import { IID, IOwnedEntity } from './base';

export interface IReminder<O> extends IOwnedEntity<O> {
  name: string;
  description: string;
}

export interface ICreateReminderDto
  extends Pick<IReminder<IID>, 'name' | 'description' | 'owner'> {}

export interface IUpdateReminderDto extends Partial<ICreateReminderDto> {}
