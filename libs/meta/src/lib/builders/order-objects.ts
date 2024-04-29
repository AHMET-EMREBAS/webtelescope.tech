import {
  excludeFalse,
  excludeUndefined,
  orderObject,
} from '@webpackages/utils';
import { PropertyOptions } from '../meta';

export function orderPropertyOptions(options: PropertyOptions) {
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
