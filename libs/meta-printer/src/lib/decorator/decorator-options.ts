import { IPrint } from '@webpackages/printer';

export class BaseDecoratorOptions<Options> implements IPrint {
  constructor(protected readonly options: Options) {}

  print(): string {
    return '';
  }
}
