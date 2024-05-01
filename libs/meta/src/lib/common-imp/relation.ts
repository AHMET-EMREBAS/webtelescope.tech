/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from './model';
import { __PropertyOptions } from '../common';

export type RelationOptions = Pick<
  __PropertyOptions<any>,
  'relationType' | 'required' | 'description' | 'name'
> & {
  model: Model;
};
