export interface ISkuView {
  barcode: string;
  sku: string;
  /**
   * Required unique short text
   */ name: string;
  description?: string;
  productBarcode: string;
  productName: string;
  productDescription: string;
}
