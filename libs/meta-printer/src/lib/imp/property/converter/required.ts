import { ClassType } from '../../../common';
import { RequiredConverter, RequiredConverterOptions } from '../../../core/property';

export const requiredConverter: RequiredConverter = (
  options: RequiredConverterOptions
) => {
  const { classType, required } = options;
  switch (classType) {
    case ClassType.CREATE:
    case ClassType.ICREATE:
    case ClassType.ENTITY:
    case ClassType.IENTITY:
      return required == true ? true : false;
    case ClassType.IQUERY:
    case ClassType.IUPDATE:
    case ClassType.QUERY:
    case ClassType.UPDATE:
      return false;
    case ClassType.VIEW:
    case ClassType.IVIEW:
      return true;
  }
};
