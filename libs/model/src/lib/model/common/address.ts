import { IID } from '../../common';

/**
 * Store address of a user, customer, or organization
 * @param id {@link IID.id}
 * @param street {@link street}
 * @param city {@link city}
 * @param state {@link state}
 * @param zip {@link zip}
 * @param country {@link country}
 * @param user {@link user}
 */
export interface IAddress<User extends IID> extends IID {
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

  /**
   * Whose address is this?
   */
  user: User;
}
