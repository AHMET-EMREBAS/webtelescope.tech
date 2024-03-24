import { ICredentials, IID, ITimestamp } from '../../common';

/**
 * Store customer information.
 * To implement contact information of the customer, use email, phone, and address entity
 * and create a dedicated entity such as CustomerAddress, CustomerEmail, and CustomerPhone
 * @param id {@link id}
 * @param username {@link ICredentials.username}
 * @param password {@link ICredentials.password}
 * @param type {@link type}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface ICustomer<Organization, PriceLevel extends IID>
  extends IID,
    ITimestamp,
    ICredentials {
  /**
   * Each customer is associated with an organization.
   * Organization is not the customer's organization, it is the organization from which the customer purchase.
   */
  organization: Organization;

  /**
   * Price level applied to this customer
   */
  priceLevel: PriceLevel;
}
