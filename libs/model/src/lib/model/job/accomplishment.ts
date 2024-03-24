import { IDescription, IID, ITarget } from '../../common';

export interface IAccomplishment<Target>
  extends IID,
    IDescription,
    ITarget<Target> {}
