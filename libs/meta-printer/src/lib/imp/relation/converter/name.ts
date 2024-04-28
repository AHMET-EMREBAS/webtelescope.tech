import { ClassType } from '../../../common';
import { NameConverter, NameConverterOptions } from '../../../core/relation';
import { toPropertyName } from '../../../utils';

export const nameConverter: NameConverter = (
  options: NameConverterOptions
) => {
  const { classType, modelName, relationName } = options;
  switch (classType) {
    case ClassType.IENTITY:
    case ClassType.ENTITY:
    case ClassType.CREATE:
    case ClassType.UPDATE:
    case ClassType.ICREATE:
    case ClassType.IUPDATE:
      return relationName;
    case ClassType.VIEW:
    case ClassType.IVIEW:
    case ClassType.QUERY:
    case ClassType.IQUERY:
      return toPropertyName(modelName, relationName);
  }
};
