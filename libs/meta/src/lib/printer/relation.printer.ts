import { RelationProperty } from '../meta';
import { ClassType } from './class-type';
import { printRequiredMark } from './required-mark.printer';

export function printRelation(
  classTYpe: ClassType,
  propertyName: string,
  options: RelationProperty
) {
  const isArray = options.type === 'Many' ? '[]' : '';
  const isRequrid = printRequiredMark(classTYpe, options.requried);

  const type =
    classTYpe === 'dto'
      ? 'IDDto'
      : classTYpe === 'dto-interface'
      ? 'IID'
      : classTYpe === 'interface'
      ? `I${options.target}`
      : options.target;

  return `${propertyName}${isRequrid}:${type}${isArray};`;
}
