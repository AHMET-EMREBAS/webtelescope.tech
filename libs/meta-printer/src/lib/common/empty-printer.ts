import { IPrint } from '@webpackages/printer';

export const EmptyPrinter: IPrint = {
  print() {
    return '';
  },
};
