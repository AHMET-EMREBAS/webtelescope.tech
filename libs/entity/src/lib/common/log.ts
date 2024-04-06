import { Logger } from '@nestjs/common';
import { ILog, LogLevelType } from '@webpackages/model';
import { Entity, StringColumn, TimestampEntity } from '@webpackages/typeorm';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

@Entity()
export class Log extends TimestampEntity implements ILog {
  @StringColumn() message!: string;
  @StringColumn() level!: LogLevelType;
  @StringColumn() context!: string;
}

@EventSubscriber()
export class LogSubscriber implements EntitySubscriberInterface<Log> {
  listenTo() {
    return Log;
  }

  afterInsert(event: InsertEvent<Log>): void {
    const { level, message, context } = event.entity;
    if (level === 'error') Logger.error(message, '', context);
    else if (level === 'fatal') Logger.fatal(message, '', context);
    else if (level === 'log') Logger.log(message, '', context);
    else if (level === 'warning') Logger.warn(message, '', context);
  }
}
