import { IID } from '../../common';
import { IOwner } from '../../common';

/**
 * IValue model is used to store single property like email, phone, or any other data that the owner entity has.
 * @param value {@link value}
 */
export interface IValue<Owner, Value> extends IID, IOwner<Owner> {
  /**
   * Value
   */
  value: Value;
}
