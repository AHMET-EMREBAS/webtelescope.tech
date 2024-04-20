import { EnumFactory } from '../utils';

/**
 * Establish a convinient and consistent query communication from client to server
 */
enum QueryOperator {
  EQUAL = 'eq',
  CONTAINS = 'co',
  STARTS_WITH = 'sw',
  ENDS_WITH = 'ew',
  MORE_THAN = 'mt',
  LESS_THAN = 'lt',
  BEFORE = 'bf',
  AFTER = 'af',
}

export const QueryOperatorMatcher = EnumFactory.create(QueryOperator);
