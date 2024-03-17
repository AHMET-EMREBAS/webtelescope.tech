export type ObjectLiteral = { [key: string]: unknown };

export type WhereOperator =
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan';

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
    .map((queryString) => {
      if (queryString) {
        const [name, operator, value] = queryString.split(':');
        if (name && operator && value) {
          return {
            name,
            operator,
            value,
          } as IWhereOption;
        }
      }
      return null;
    })
    .filter((e) => e);

  if (result.length > 0) {
    return result;
  }
  return null;
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
        if (name && operator && value) {
          return `where=${String(name)}:${operator}:${value}`;
        }
        return null;
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
          if (name && order) {
            return {
              [name]: order,
            } as IOrder;
          }
        }
        return null;
      })
      .filter((e) => e);

    if (result.length > 0) {
      return result.reduce((p, c) => {
        return { ...p, ...c };
      });
    }
  }

  return null;
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

export interface IQueryDto<Where = string, Order = string> {
  take?: number;
  skip?: number;
  select?: string[] | string;
  where?: Where[] | Where;
  order?: Order[] | Order;
  withDeleted?: boolean;
}
