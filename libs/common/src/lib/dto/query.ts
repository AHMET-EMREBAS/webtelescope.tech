export type ObjectLiteral = { [key: string]: unknown };

export type WhereOperator =
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan';

export interface IWhereOption<T> {
  name: keyof T;
  operator: WhereOperator;
  value: string;
}

/**
 * Parse query string propertyName:operator:value into IWhereOption object
 * @param queryString
 * @returns
 */
export function parseWhereOption<T>(queryStrings: string[]) {
  const result = queryStrings
    .map((queryString) => {
      const [name, operator, value] = queryString.split(':');
      if (name && operator && value) {
        return {
          name,
          operator,
          value,
        } as IWhereOption<T>;
      }
      return null;
    })
    .filter((e) => e);

  if (result.length > 0) {
    return result;
  }
  return null;
}

export function toWhereString<T>(whereOptions: IWhereOption<T>[]) {
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

export type IOrder<T extends ObjectLiteral> = Partial<
  Record<keyof T, 'ASC' | 'DESC' | 'asc' | 'desc'>
>;

/**
 * Parse order query string into IOrderOption<T>
 * @param queryString
 * @returns
 */
export function parseOrderOption<T extends ObjectLiteral>(
  queryStrings: string[]
) {
  const result = queryStrings.map((queryString) => {
    const [name, orderDirection] = queryString.split(':');
    if (name && orderDirection) {
      return {
        [name]: orderDirection,
      } as IOrder<T>;
    }
    return {};
  });

  if (result.length > 0) {
    return result.reduce((p, c) => {
      return { ...p, ...c };
    });
  }

  return null;
}

export function toOrderString<T extends ObjectLiteral>(obj: IOrder<T>) {
  if (obj) {
    const entries = Object.entries(obj);
    if (entries.length > 0) {
      return entries.map(([key, value]) => `order=${key}:${value}`).join('&');
    }
  }
  return '';
}

export interface IQueryDto<T extends ObjectLiteral> {
  take?: number;
  skip?: number;
  select?: (keyof T)[];
  where?: string[] | string;
  order?: string[] | string;
  withDeleted?: boolean;
}
