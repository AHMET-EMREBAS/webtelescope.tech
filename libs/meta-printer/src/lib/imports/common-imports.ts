import { IPrint, ImportPrinter } from '@webpackages/printer';

export const CommonEntityImports: IPrint = {
  print() {
    new ImportPrinter({
      source: '@webpackages/core',
      items: ['Entity', 'Column', 'Relation'],
    });
    return '';
  },
};

export const CommonDtoImports: IPrint = {
  print() {
    new ImportPrinter({
      source: '@webpackages/core',
      items: ['Dto', 'Property', 'IDDto'],
    });
    return '';
  },
};

export const CommonViewImports: IPrint = {
  print() {
    new ImportPrinter({
      source: '@webpackages/core',
      items: ['ViewEntity', 'ViewColumn'],
    });
    return '';
  },
};
