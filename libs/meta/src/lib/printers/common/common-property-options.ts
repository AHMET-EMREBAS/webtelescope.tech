import { PropertyType } from '../../meta';
import { Constructor } from './constructor';

export type CommonPropertyOptions = {
  name: string;
  required?: boolean;
  type: PropertyType;
  target?: Constructor;
  isArray?: boolean;
};
