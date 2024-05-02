export interface IQueryOrderDto {
  quantity?: number;
  discount?: number;
  total?: number;
  subTotal?: number;
  tax?: number;
  /**
   * Order description or notes
   */ description?: string;
  skuBarcode?: string;
  skuSku?: string;
  skuName?: string;
  skuDescription?: string;
  cartDescription?: string;
  cartChecked?: boolean;
}
