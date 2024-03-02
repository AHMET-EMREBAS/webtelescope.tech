import { IBaseEntity } from './base';
import { IImage } from './image';

export interface IProfile extends IBaseEntity {
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: IImage;
}
