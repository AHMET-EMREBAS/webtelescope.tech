import { TypeConverter, TypeConverterOptions } from '../../../core/relation';
import { ClassType } from '../../../common';

export const typeConverter: TypeConverter = (
  options: TypeConverterOptions
): string => {
  const { classType, type } = options;
  switch (classType) {
    case ClassType.IENTITY:
    case ClassType.ENTITY:
      return type;
    case ClassType.CREATE:
    case ClassType.UPDATE:
      return 'IDDto';
    case ClassType.IUPDATE:
    case ClassType.ICREATE:
      return 'IID';
    case ClassType.IQUERY:
    case ClassType.IVIEW:
    case ClassType.QUERY:
    case ClassType.VIEW:
      return 'any; // Something wrong with this line! Relation property should not be here!';
  }
};
