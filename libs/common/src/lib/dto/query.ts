export type ObjectLiteral = { [key: string]: unknown };

export type WhereOperator =
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'moreThan'
  | 'lessThan'
  | 'before'
  | 'after';

export const whereOperatorList: Readonly<string[]> = [
  'equals',
  'contains',
  'startsWith',
  'endsWith',
  'moreThan',
  'lessThan',
  'before',
  'after',
];

const orderDirectionList: Readonly<string[]> = ['ASC', 'DESC', 'asc', 'desc'];

export function isValidOperator(operator: string) {
  return whereOperatorList.includes(operator);
}

export function isValidOrderDir(order: string) {
  return orderDirectionList.includes(order);
}

export interface IWhereOption {
  name: string;
  operator: WhereOperator;
  value: string;
}

/**
 * Parse query string propertyName:operator:value into IWhereOption object
 * @param queryString
 * @returns
 */
export function parseWhereOption(...queryStrings: string[]) {
  const result = queryStrings
    .map((qs) => {
      if (qs) {
        const [name, operator, value] = qs.split(':');

        if (!isValidOperator(operator)) {
          return undefined;
        }
        if (name && operator && value) {
          return {
            name,
            operator,
            value,
          } as IWhereOption;
        }
      }
      return undefined;
    })
    .filter((e) => e);

  if (result.length > 0) {
    return result;
  }
  return undefined;
}

/**
 * Convert IWhereOptions into query url string.
 * @param whereOptions
 * @returns
 */
export function toWhereString(whereOptions: IWhereOption[]) {
  if (whereOptions.length > 0) {
    const whereQuery = whereOptions
      .map((where) => {
        const { name, operator, value } = where;
        if (!isValidOperator(operator)) {
          return undefined;
        }
        if (name && operator && value) {
          return `where=${String(name)}:${operator}:${value}`;
        }
        return undefined;
      })
      .filter((e) => e)
      .join('&');
    return whereQuery;
  }

  return '';
}

export interface IOrder {
  [key: string]: 'ASC' | 'DESC' | 'asc' | 'desc';
}

/**
 * Parse order query string into IOrderOption<T>
 * @param queryString
 * @returns
 */
export function parseOrderOption(...queryStrings: string[]) {
  if (queryStrings && queryStrings.length > 0) {
    const result = queryStrings
      .map((queryString) => {
        if (queryString) {
          const [name, order] = queryString.split(':');

          if (!isValidOrderDir(order)) {
            return undefined;
          }
          if (name && order) {
            return {
              [name]: order,
            } as IOrder;
          }
        }
        return undefined;
      })
      .filter((e) => e);

    if (result.length > 0) {
      return result.reduce((p, c) => {
        return { ...p, ...c };
      });
    }
  }

  return undefined;
}

/**
 * Convert IOrder object into query url string
 * @param obj
 * @returns
 */
export function toOrderString(obj: IOrder) {
  if (obj) {
    const entries = Object.entries(obj);
    if (entries.length > 0) {
      return entries.map(([key, value]) => `order=${key}:${value}`).join('&');
    }
  }
  return '';
}

export interface IQueryDto<T,Where = string, Order = string> {
  take?: number;
  skip?: number;
  select?: keyof T[] | keyof T;
  where?: Where[] | Where;
  order?: Order[] | Order;
  withDeleted?: boolean;
}
