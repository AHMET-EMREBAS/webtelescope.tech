import { names } from '@webpackages/utils';
import { ModelMeta } from '../../meta';
import { Printable } from '../common';
import { InputPrinter } from './input';
import { RelationInputPrinter } from './relation-input';

export class FormPrinter implements Printable {
  constructor(public readonly options: ModelMeta) {}

  printRelationInputs(): string {
    return Object.entries(this.options.relations || {})
      .map(([, value]) => {
        return new RelationInputPrinter(value).print();
      })
      .join('\n');
  }

  printInputs(): string {
    return Object.entries(this.options.properties || {})
      .map(([, value]) => {
        return new InputPrinter(value).print();
      })
      .join('\n');
  }

  print(): string {
    return `
    <form [formGroup]="formGroup" class="flex column gap-1" >
      ${this.printInputs()}
      ${this.printRelationInputs()}

      <div class="flex gap-1">
          <button mat-raised-button color="primary" i18n>Save ${
            names(this.options.name).readableName
          }</button>
          <button i18n>Clear Form</button>
      </div>
    </form>
    `;
  }
}
