import { RelationProperty } from '../meta';
import { ClassType } from './class-type';

export function printRelation(
  classTYpe: ClassType,
  propertyName: string,
  options: RelationProperty
) {
  const isArray = options.type === 'Many' ? '[]' : '';
  const isRequrid = options.requried
    ? classTYpe === 'interface' || classTYpe == 'dto-interface'
      ? ''
      : '!'
    : '?';

  const type =
    classTYpe === 'dto'
      ? 'IDDto'
      : classTYpe === 'dto-interface'
      ? 'IID'
      : options.target;

  return `${propertyName}${isRequrid}:${type}${isArray};`;
}
