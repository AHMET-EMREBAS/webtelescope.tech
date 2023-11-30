/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { stringify } from 'querystring';
import { IDecoratorPrinter } from '../common';
import { excludeUndefined } from '@webpackages/utils';

export abstract class AbstractDecoratorPrinter
  implements IDecoratorPrinter<any>
{
  constructor(
    public readonly decoratorName: string,
    public readonly options?: any
  ) {}

  print(): string {
    const __options = this.options
      ? stringify(excludeUndefined(this.options))
      : '';

    return `@${this.decoratorName}(${__options})`;
  }
}
