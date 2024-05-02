export interface ISaleView {
  total: number;
  subtotal: number;
  tax: number;
  discount?: number;
  cartDescription: string;
  cartChecked: boolean;
  customerUsername: string;
  customerPassword: string;
}
