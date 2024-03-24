import { IDomain, IID, INameDescription } from '../../common';

export interface ICompany<Industry> extends IID, INameDescription, IDomain {
  industries: Industry[];
}
