import { IID, IName, ITarget } from '../../common';

export interface IOccupation<Target> extends IID, IName, ITarget<Target> {}
