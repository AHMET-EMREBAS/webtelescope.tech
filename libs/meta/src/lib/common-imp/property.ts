/* eslint-disable @typescript-eslint/no-explicit-any */

import { __Boolean } from './boolean';
import { __Date } from './date';
import { __Number } from './number';
import { __Object } from './object';
import { __String } from './string';

export type PropertyOptions = Omit<
  __String | __Number | __Boolean | __Date | __Object,
  'relationType'
>;
