/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PropertyOptions,
  WhereQueryBuilder,
  WhereQueryFunction,
  parseWhereQuery,
} from '@webpackages/common';
import { Transform } from 'class-transformer';
import {
  isArray,
  isDateString,
  isNumberString,
  isString,
} from 'class-validator';
import { ILike, LessThan, MoreThan } from 'typeorm';

/**
 * If property value is undefined, then set value to default value.
 * @param defaultValue
 * @returns
 */
export function DefaultValueTransformer(defaultValue: any) {
  return Transform(({ value }) => {
    if (value !== undefined) {
      return value;
    } else {
      return defaultValue;
    }
  });
}

/**
 * Query params are passed as string, this transformer parses inputs
 * @returns
 */
export function QueryParamTransformer(options: PropertyOptions) {
  const type = options.type;
  const defaultValue =
    options.default !== undefined ? options.default : undefined;
  return Transform(({ value }) => {
    if (type === 'string') {
      return value !== undefined ? value : defaultValue;
    } else if (type === 'boolean')
      return value === 'true' ? true : value === 'false' ? false : defaultValue;
    else if (type === 'date') {
      if (isDateString(value)) {
        return new Date(value);
      }
      return defaultValue;
    } else if (type === 'number') {
      return isNumberString(value) ? parseFloat(value) : defaultValue;
    } else if (type === 'object') {
      if (value) {
        if (isString(value)) {
          const [k, v] = value.split(':');
          if (k && v) {
            return { [k]: v };
          }
        } else if (isArray(value)) {
          return value
            .map((e) => {
              const [k, v] = e.split(':');
              if (k && v) {
                return { [k]: v };
              }
              return undefined;
            })
            .filter((e) => e)
            .reduce((p, c) => {
              return { ...p, ...c };
            });
        }
        return defaultValue;
      }
      return defaultValue;
    }
  });
}

export function createWhereQueryOperator(query: WhereQueryBuilder) {
  const { func, propertyName: pn, search } = query;

  if (func === WhereQueryFunction.CONTAIN) {
    return { [pn]: ILike(`%${search}%`) };
  } else if (func === WhereQueryFunction.END_WITH) {
    return { [pn]: ILike(`%${search}`) };
  } else if (func === WhereQueryFunction.START_WITH) {
    return { [pn]: ILike(`${search}%`) };
  } else if (func === WhereQueryFunction.EQUAL) {
    return { [pn]: ILike(`${search}`) };
  } else if (func === WhereQueryFunction.LESS) {
    if (isNumberString(search)) {
      return { [pn]: LessThan(parseFloat(search)) };
    } else if (isDateString(search)) {
      return { [pn]: LessThan(new Date(search)) };
    }
  } else if (func === WhereQueryFunction.MORE) {
    if (isNumberString(search)) {
      return { [pn]: MoreThan(parseFloat(search)) };
    } else if (isDateString(search)) {
      return { [pn]: MoreThan(new Date(search)) };
    }
  }

  return undefined;
}

export function WhereQueryTransformer(options: PropertyOptions) {
  return Transform(({ value }) => {
    const defaultValue = options.default;

    if (isString(value)) {
      const wq = parseWhereQuery(value);

      if (wq) {
        return [createWhereQueryOperator(wq)];
      }

      return undefined;
    } else if (isArray(value)) {
      return value
        .map((e) => {
          if (e) {
            console.log('From Array: ', e);
            const wq = parseWhereQuery(e);
            if (wq) {
              return createWhereQueryOperator(wq);
            }
          }

          return undefined;
        })
        .filter((e) => e);
    }

    return defaultValue;
  });
}
