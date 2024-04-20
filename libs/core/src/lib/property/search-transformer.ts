import { SearchOperator } from '@webpackages/common';
import { Transform } from 'class-transformer';
import { ILike, LessThan, MoreThan } from 'typeorm';

/**
 * Transform search string if any into typeorm query find operators.
 * @returns
 */
export function SearchTransformer() {
  return Transform(({ value }) => {
    if (value != undefined) {
      const isComplexQuery = value.includes(':');

      if (isComplexQuery) {
        const [op, search] = value.split(':');

        const asNumber = parseFloat(search);

        if (op && op.length > 0 && search && search.length > 0) {
          switch (op) {
            case SearchOperator.EQUAL:
              return ILike(`${search}`);
            case SearchOperator.CONTAINS:
              return ILike(`%${search}%`);
            case SearchOperator.ENDS_WITH:
              return ILike(`%${search}`);
            case SearchOperator.STARTS_WITH:
              return ILike(`${search}%`);
            case SearchOperator.MORE_THAN:
              if (isNaN(asNumber)) return null;
              return MoreThan(asNumber);
            case SearchOperator.LESS_THAN:
              if (isNaN(asNumber)) return null;
              return LessThan(asNumber);
            default:
              return null;
          }
        }
        return null;
      } else {
        return ILike(`%${value}%`);
      }
    }

    return null;
  });
}
