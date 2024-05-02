export interface IQueryQuantityDto {
  /**
   * Quantity of the Product-Sku in the store.
   */
  quanitty?: number;
  skuBarcode?: string;
  skuSku?: string;
  skuName?: string;
  skuDescription?: string;
  storeName?: string;
}
