import { IID } from '../../common';
import { ICheckout } from '../../model';

export interface ICreateCheckoutDto
  extends Pick<
    ICheckout<IID, IID, IID>,
    | 'employee'
    | 'customer'
    | 'shoppingCart'
    | 'federalTaxExemptID'
    | 'stateTaxExemptID'
    | 'status'
    | 'subtotal'
    | 'tax'
    | 'taxexempt'
    | 'total'
  > {}
