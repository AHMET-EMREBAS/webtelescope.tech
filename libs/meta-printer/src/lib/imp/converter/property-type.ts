import { PropertyType, PropertyTypeName } from '@webpackages/meta';
import { PropertyTypeConverter } from '../../property';

export const propertyTypeConverter: PropertyTypeConverter = (
  type: string,
  objectType?: string
): string => {
  switch (type as PropertyType) {
    case PropertyTypeName.BOOLEAN:
    case PropertyTypeName.NUMBER:
    case PropertyTypeName.STRING:
      return type;
    case PropertyTypeName.DATE:
      return 'Date';
    case PropertyTypeName.OBJECT: {
      if (objectType) return objectType;
      return 'unkown';
    }
    default:
      return 'unkown';
  }
};
