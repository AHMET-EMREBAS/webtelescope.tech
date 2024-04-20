import { EnumFactory } from '../utils';

/**
 * @goal Establish a convinient and consistent query operations from client to server
 * @example `.../?name=sw:<search-string>&name=co:<search-string>&name=sw:<search-string>`
 */
enum QueryOperatorEnum {
  EQUAL = 'eq',
  CONTAINS = 'co',
  STARTS_WITH = 'sw',
  ENDS_WITH = 'ew',
  MORE_THAN = 'mt',
  LESS_THAN = 'lt',
  BEFORE = 'bf',
  AFTER = 'af',
}

export const QueryOperator = EnumFactory.create(QueryOperatorEnum);
