export interface IQueryProductDto {
  barcode?: string;
  /**
   * Required unique short text
   */
  name?: string;
  description?: string;
  categoryName?: string;
  departmentName?: string;
}
