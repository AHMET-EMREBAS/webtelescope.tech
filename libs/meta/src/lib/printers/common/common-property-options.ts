import { Constructor } from './constructor';

export type CommonPropertyOptions = {
  name: string;
  required?: boolean;
  type: string;
  target?: Constructor;
  isArray?: boolean;
};
