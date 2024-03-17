import {
  IWhereOption,
  parseOrderOption,
  parseWhereOption,
} from '@webpackages/common';
import { Transform } from 'class-transformer';
import { ILike, LessThan, MoreThan, MoreThanOrEqual } from 'typeorm';

export function OrderTransformer() {
  return Transform(({ value }) => (value ? parseOrderOption(value) : null));
}

export function toFindOperator(option: IWhereOption) {
  const { operator, name, value } = option;

  if (operator === 'contains') {
    return { [name]: ILike(`%${value}%`) };
  } else if (operator === 'endsWith') {
    return { [name]: ILike(`%${value}`) };
  } else if (operator === 'equals') {
    return { [name]: ILike(`${value}`) };
  } else if (operator === 'moreThan') {
    return { [name]: MoreThan(parseFloat(value)) };
  } else if (operator === 'lessThan') {
    return { [name]: LessThan(parseFloat(value)) };
  } else if (operator === 'startsWith') {
    return { [name]: ILike(`${value}%`) };
  } else if (operator === 'before') {
    return { [name]: LessThan(new Date(parseFloat(value))) };
  } else if (operator === 'after') {
    return { [name]: MoreThanOrEqual(new Date(parseFloat(value))) };
  }

  return null;
}

export function WhereTransformer() {
  return Transform(({ value }) => {
    const queries = parseWhereOption(value);
    if (queries && queries?.length > 0) {
      return queries
        ?.map((e) => {
          if (e) {
            const operator = toFindOperator(e);

            if (operator) {
              return operator;
            }
          }
          return null;
        })
        .filter((e) => e);
    }
    return null;
  });
}
