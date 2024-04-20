/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryOperatorMatcher } from '@webpackages/common';
import { Transform } from 'class-transformer';
import { FindOperator, ILike, LessThan, MoreThan } from 'typeorm';

/**
 * Transform search string if any into typeorm query find operators.
 * @returns
 */
export function QueryProperty() {
  return Transform(({ value: searchText }) => {
    if (searchText && typeof searchText == 'string') {
      if (searchText.includes(':')) {
        const [op, va] = searchText.split(':');

        if (op && va) {
          if (op.length > 0 && va.length > 0) {
            const search = va.trim();
            QueryOperatorMatcher.matcher<FindOperator<string>>(op)
              .is('AFTER', () => MoreThan(search))
              .is('BEFORE', () => LessThan(search))
              .is('MORE_THAN', () => MoreThan(search))
              .is('LESS_THAN', () => LessThan(search))
              .is('CONTAINS', () => ILike(`%${search}%`))
              .is('STARTS_WITH', () => LessThan(`${search}%`))
              .is('ENDS_WITH', () => LessThan(`%${search}`))
              .is('EQUAL', () => ILike(`${search}`))
              .done();
          }
        } else {
          return undefined;
        }
      } else {
        return ILike(`%${searchText}%`);
      }
    }

    return undefined;
  });
}
