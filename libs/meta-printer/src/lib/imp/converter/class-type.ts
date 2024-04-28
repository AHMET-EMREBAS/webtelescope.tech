import { ExtClassType } from '../../core';
import { ClassType } from '../../common';
import { ClassTypeConverter } from '../../property/printer';

/**
 * Convert {@link ClassType} to {@link ExtClassType}
 * @param classType
 * @returns
 */
export const classTypeConverter: ClassTypeConverter = (
  classType: ClassType
): ExtClassType => {
  switch (classType) {
    case ClassType.ENTITY:
    case ClassType.VIEW:
    case ClassType.CREATE:
    case ClassType.UPDATE:
    case ClassType.QUERY:
      return ExtClassType.CLASS;
    case ClassType.IENTITY:
    case ClassType.IVIEW:
    case ClassType.ICREATE:
    case ClassType.IUPDATE:
    case ClassType.IQUERY:
      return ExtClassType.INTERFACE;
  }
};
