import { ClassType } from './class-type';

export function printRequiredMark(classType: ClassType, required?: boolean) {
  return classType === 'dto-query'
    ? '?'
    : required
    ? classType === 'interface' || classType === 'dto-interface'
      ? ''
      : '!'
    : '?';
}
