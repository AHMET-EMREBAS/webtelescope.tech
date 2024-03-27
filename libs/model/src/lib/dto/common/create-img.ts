import { IID } from '../../common';
import { IImg } from '../../model';

export interface ICreateImageDto
  extends Pick<IImg<IID>, 'imageName' | 'owner'> {}
