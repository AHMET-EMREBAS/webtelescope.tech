import { IID } from '../../common';
import { IValue } from './value';

/**
 * @param id {@link IID.id}
 * @param value {@link value} Email address
 * @param owner {@link IValue.owner}
 */
export interface IEmail<User extends IID> extends IValue<User, string> {}
