import {
  excludeFalse,
  excludeUndefined,
  orderObject,
} from '@webpackages/utils';
import { PropertyOptions } from '../common-imp';

export function orderPropertyOptions(
  options: Partial<PropertyOptions>
): PropertyOptions {
  return excludeFalse(
    excludeUndefined(
      orderObject(options, [
        'name',
        'type',
        'objectType',
        'isArray',
        'required',
        'unique',
        'enums',
        'defaultValue',
        'description',
      ])
    )
  );
}
