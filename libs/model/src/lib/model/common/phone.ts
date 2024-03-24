import { IID } from '../../common';
import { IValue } from './value';

/**
 * @param id {@link IID.id}
 * @param value {@link value} Phone number
 * @param owner {@link IOwner.owner}
 */
export interface IPhone<Owner extends IID> extends IValue<Owner, string> {}
