/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryOperatorMatcher, stringValue } from '@webpackages/common';
import { Transform } from 'class-transformer';
import { FindOperator, ILike, LessThan, MoreThan } from 'typeorm';

/**
 * Convert operator and search string into Typeorm FindOperator
 * @param operatorName
 * @param searchString
 * @returns
 */
export function toFindOperator(operatorName: string, searchString: string) {
  return QueryOperatorMatcher.matcher<FindOperator<string>>(operatorName)
    .is('AFTER', () => MoreThan(searchString))
    .is('BEFORE', () => LessThan(searchString))
    .is('MORE_THAN', () => MoreThan(searchString))
    .is('LESS_THAN', () => LessThan(searchString))
    .is('CONTAINS', () => ILike(`%${searchString}%`))
    .is('STARTS_WITH', () => LessThan(`${searchString}%`))
    .is('ENDS_WITH', () => LessThan(`%${searchString}`))
    .is('EQUAL', () => ILike(`${searchString}`))
    .done('DONE')
    .get();
}
/**
 * Transform search string if any into typeorm query find operators.
 * @returns
 */
export function QueryProperty() {
  return Transform(({ value: rawStringValue }) => {
    const searchText = stringValue(rawStringValue);

    if (searchText) {
      if (searchText.includes(':')) {
        const result = searchText.split(':');
        const operator = stringValue(result[0]);
        const search = stringValue(result[1]);

        if (operator && search) return toFindOperator(operator, search);
      }
      return ILike(`%${searchText}%`);
    }

    return undefined;
  });
}
