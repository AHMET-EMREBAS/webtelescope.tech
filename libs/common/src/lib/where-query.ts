export enum WhereQueryFunction {
  START_WITH = 'startWith',
  END_WITH = 'endWith',
  CONTAIN = 'contain',
  EQUAL = 'equal',
  MORE = 'more',
  LESS = 'less',
}

/**
 * Create a single query param
 * @example where=name:equal:someValue
 */
export class WhereQueryBuilder {
  constructor(
    public readonly func: WhereQueryFunction,
    public readonly propertyName: string,
    public readonly search: string
  ) {}

  toString() {
    const value = [this.propertyName, this.func, this.search].join(':');
    return `where=${value}`;
  }
}

/**
 * Convert string representative of WhereQuery into WhereQuery
 * @param query
 * @returns
 */
export function parseWhereQuery(query: string) {
  const [p, f, v] = query.split(':');

  if (p && f && v) {
    return new WhereQueryBuilder(f as WhereQueryFunction, p, v);
  }

  return undefined;
}
