/**
 * @goal paginate query results
 * @param {number} take
 */
export interface IPaginatorDto {
  /**
   * Take the number of items (limit)
   */
  take: number;

  /**
   * Skip the number of items (offset)
   */
  skip: number;
}
