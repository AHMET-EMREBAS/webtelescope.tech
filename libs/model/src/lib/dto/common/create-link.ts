import { IID } from '../../common';
import { ILink } from '../../model';

export interface ICreateLinkDto extends Pick<ILink<IID>, 'href' | 'owner'> {}
