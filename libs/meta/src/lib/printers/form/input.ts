import { excludeUndefined } from '@webpackages/utils';
import { PropertyMeta } from '../../meta';
import { Printable } from '../common';

export class InputPrinter implements Printable {
  constructor(public readonly options: PropertyMeta) {}

  printAttributes(): string {
    const type = this.options.type;
    if (type === 'string') {
      const { isIn: options, minLength, maxLength } = this.options;
      const attributes = Object.entries(
        excludeUndefined({ options, minLength, maxLength })
      )
        .map(([key, value]) => {
          return `[${key}]="${value}"`;
        })
        .join(' ');
      return attributes;
    } else if (type === 'number') {
      const { min, max } = this.options;
      const attributes = Object.entries(excludeUndefined({ min, max }))
        .map(([key, value]) => `[${key}]="${value}"`)
        .join(' ');
      return attributes;
    }

    return '';
  }

  print(): string {
    const { icon, name, label, inputType, type, required, hint } = this.options;
    const attributes = Object.entries(
      excludeUndefined({ icon, name, label, inputType, type, required, hint })
    )
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return `[${key}]="${value}"`;
        }
        return `${key}="${value}"`;
      })
      .join(' ');

    return `<wt-form-input [formGroup]="formGroup" ${attributes} ${this.printAttributes()}></wt-form-input>`;
  }
}
