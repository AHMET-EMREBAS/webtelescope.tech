import {
  IWhereOption,
  parseOrderOption,
  parseWhereOption,
} from '@webpackages/common';
import { Transform } from 'class-transformer';
import { ILike, LessThan, MoreThan } from 'typeorm';

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
  } else if (operator === 'greaterThan') {
    return { [name]: MoreThan(value) };
  } else if (operator === 'lessThan') {
    return { [name]: LessThan(value) };
  } else if (operator === 'startsWith') {
    return { [name]: ILike(`${value}%`) };
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
