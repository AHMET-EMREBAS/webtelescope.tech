import { IID } from '../../common';

/**
 * IValue model is used to store single property like email, phone, or any other data that the owner entity has.
 *
 * @param id {@link IID.id}
 * @param value {@link value}
 * @param owner {@link IOwner.owner}
 */
export interface IValue<Owner, Value> extends IID {
  /**
   * Value
   */
  value: Value;

  /**
   * Who is the owner of this data?
   */
  owner: Owner;
}
