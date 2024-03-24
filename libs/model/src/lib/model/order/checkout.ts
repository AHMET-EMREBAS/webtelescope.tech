import { IID, IOwner } from '../../common';

/**
 * @type success means payment is successful.
 * @type failure means payment is NOT successful.
 * @type processing means payment is processing.
 */
export type CheckoutStatus = 'success' | 'failure' | 'processing';

/**
 * After customer finish shopping, then checkout is created for the associated shopping cart.
 * Price and tax related data is calcuated and stored.
 * @param id {@link IID.id}
 * @param owner {@link IOwner.owner} Customer
 * @param employee {@link Employee}
 * @param total {@link total}
 * @param subtotal {@link subtotal}
 * @param tax {@link tax}
 * @param taxexempt {@link taxexempt}
 * @param federalTaxExemptID {@link federalTaxExemptID}
 * @param stateTaxExemptID {@link stateTaxExemptID}
 *
 */
export interface ICheckout<
  Employee extends IID,
  Customer extends IID,
  ShoppingCart extends IID
> extends IID,
    IOwner<Customer> {
  /**
   * Total price of the items in the shopping cart
   */
  total: number;

  /**
   * Total price of the items without tax in the shopping cart
   */
  subtotal: number;
  /**
   * Tax of the items in the shopping cart
   */
  tax: number;

  /**
   * Is tax exempt
   */
  taxexempt: boolean;

  /**
   * Federal tax exempt id
   */
  federalTaxExemptID: string;

  /**
   * State tax exempt id
   */
  stateTaxExemptID: string;

  /**
   * {@link CheckoutStatus}
   */
  status: CheckoutStatus;

  /**
   * Associated shopping cart
   */
  shoppingCart: ShoppingCart;

  /**
   * Associated employee
   */
  employee: Employee;
}
