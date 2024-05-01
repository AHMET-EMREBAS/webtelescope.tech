/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from './model';
import { PropertyOptions } from '../common';

export type RelationOptions = Pick<
  PropertyOptions<any>,
  'relationType' | 'required' | 'description' | 'relationName'
> & {
  model: Model;
};
