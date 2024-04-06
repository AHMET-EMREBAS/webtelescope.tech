import { IID, ITimestamp } from '../../common';

export class LogLevel {
  readonly log = 'log';
  readonly error = 'error';
  readonly warning = 'warning';
  readonly fatal = 'fatal';
}

export type LogLevelType = keyof LogLevel;

export const LogLevelList = Object.keys({
  ...new LogLevel(),
}) as LogLevelType[];

export interface ILog extends IID, ITimestamp {
  message: string;
  context: string;
  level: LogLevelType;
}
