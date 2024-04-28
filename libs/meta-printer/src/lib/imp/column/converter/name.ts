import { ClassType } from '../../../common';
import { NameConverter, NameConverterOptions } from '../../../core/column';
import { toPropertyName } from '../../../utils';

export const nameConverter: NameConverter = (
  options: NameConverterOptions
) => {
  const { classType, modelName, columnName } = options;
  switch (classType) {
    case ClassType.IENTITY:
    case ClassType.ENTITY:
    case ClassType.CREATE:
    case ClassType.UPDATE:
    case ClassType.ICREATE:
    case ClassType.IUPDATE:
      return columnName;
    case ClassType.VIEW:
    case ClassType.IVIEW:
    case ClassType.QUERY:
    case ClassType.IQUERY:
      return toPropertyName(modelName, columnName);
  }
};
