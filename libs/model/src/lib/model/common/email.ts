import { IID } from '../../common';
import { IValue } from './value';

/**
 * @param id {@link IID.id}
 * @param value {@link value} Email address
 * @param owner {@link IOwner.owner}
 */
export interface IEmail<Owner extends IID> extends IValue<Owner, string> {}
