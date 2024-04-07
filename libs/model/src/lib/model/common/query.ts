/* eslint-disable @typescript-eslint/no-explicit-any */
export enum QueryOperator {
  equal = 'equal',
  contains = 'contains',
  startWith = 'startWith',
  endWith = 'endWith',
  moreThan = 'moreThan',
  lessThan = 'lessThan',
}

export interface IWhere {
  property: string;
  operator: QueryOperator;
  value: string;
}

export interface IQuery {
  take?: number;
  skip?: number;
  withDeleted?: boolean;
  where?: IWhere[];
  order?: Record<any, 'ASC' | 'DESC'>;
  select?: string[];
  loadEagerRelations?: boolean;
}

export function transformWhereObjectToQueryString(where: IWhere): string {
  const { operator, property, value } = where;
  return `${property}:${operator}:${value}`;
}

export function transformStringToWhereObject(
  queryString: string
): IWhere | undefined {
  const [property, operator, value] = queryString.split(':');

  if (property && operator && value) {
    return {
      property,
      operator: operator as QueryOperator,
      value,
    };
  }
  return undefined;
}
