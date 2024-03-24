import { IID } from '../../common';
import { IOwner } from '../../common';

/**
 * Store address of a user, customer, or organization
 * @param id {@link IID.id}
 * @param street {@link street}
 * @param city {@link city}
 * @param state {@link state}
 * @param zip {@link zip}
 * @param country {@link country}
 * @param owner {@link IOwner.owner}
 */
export interface IAddress<Owner extends IID> extends IID, IOwner<Owner> {
  /**
   * street proeprty
   **/
  street: string;

  /**
   * unit proeprty such us appartment number
   **/
  unit: string;

  /**
   * city proeprty
   **/
  city: string;

  /**
   * state proeprty
   **/

  state: string;

  /**
   * zip proeprty
   **/
  zip: string;

  /**
   * country property
   */
  country: string;
}
