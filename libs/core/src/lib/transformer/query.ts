import {
  IWhereOption,
  parseOrderOption,
  parseWhereOption,
} from '@webpackages/common';
import { Transform } from 'class-transformer';
import { isArray, isBooleanString, isNumberString } from 'class-validator';
import { ILike, LessThan, MoreThan, MoreThanOrEqual } from 'typeorm';

export function ObjectTransformer() {
  return Transform(({ value }) => {
    if (value) {
      return (value as string[])
        .map((e) => e.split(':'))
        .map(([k, v]) => {
          try {
            const vvalue = JSON.parse(v);
            return { [k]: vvalue };
          } catch (err) {
            return { [k]: v };
          }
        })
        .reduce((p, c) => ({ ...p, ...c }));
    }
    return undefined;
  });
}

export function OrderTransformer() {
  return Transform(({ value }) => {
    if (value) {
      if (isArray(value)) {
        return parseOrderOption(...value);
      } else {
        return parseOrderOption(value);
      }
    }
    return undefined;
  });
}

export function toFindOperator(option: IWhereOption) {
  const { operator, name, value } = option;

  if (operator === 'contains') {
    return { [name]: ILike(`%${value}%`) };
  } else if (operator === 'equals') {
    if (isBooleanString(value)) {
      return { [name]: JSON.parse(value) };
    } else if (isNumberString(value)) {
      return { [name]: parseFloat(value) };
    }
    return { [name]: ILike(value) };
  } else if (operator === 'startsWith') {
    return { [name]: ILike(`${value}%`) };
  } else if (operator === 'endsWith') {
    return { [name]: ILike(`%${value}`) };
  } else if (operator === 'moreThan') {
    return { [name]: MoreThan(parseFloat(value)) };
  } else if (operator === 'lessThan') {
    return { [name]: LessThan(parseFloat(value)) };
  } else if (operator === 'before') {
    return { [name]: LessThan(new Date(parseFloat(value))) };
  } else if (operator === 'after') {
    return { [name]: MoreThanOrEqual(new Date(parseFloat(value))) };
  }

  return undefined;
}

export function WhereTransformer() {
  return Transform(({ value }) => {
    const queries = isArray(value)
      ? parseWhereOption(...value)
      : parseWhereOption(value);

    if (queries && queries?.length > 0) {
      return queries
        ?.map((e) => {
          if (e) {
            const operator = toFindOperator(e);
            if (operator) {
              return operator;
            }
          }
          return undefined;
        })
        .filter((e) => e);
    }
    return undefined;
  });
}

/**
 * Convert query input into array
 * @returns
 */
export function StringOrArrayTransformer() {
  return Transform(({ value }) => {
    if (value) {
      if (isArray(value)) {
        return value;
      } else {
        return [value];
      }
    }
    return undefined;
  });
}

export function BooleanTransformer() {
  return Transform(({ value }) => {
    if (value !== undefined) {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      } else {
        return undefined;
      }
    }
    return undefined;
  });
}

export function EmptyStringTransformer() {
  return Transform(({ value }) => {
    if (value && value.length > 0) {
      return value;
    }
    return undefined;
  });
}
