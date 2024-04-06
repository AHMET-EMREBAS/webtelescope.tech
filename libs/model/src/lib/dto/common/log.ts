import { ILog } from '../../model';

export interface ICreateLogDto extends Pick<ILog, 'message' | 'level'> {}
