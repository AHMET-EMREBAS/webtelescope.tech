import { RelationMeta } from '../../meta';
import { Printable } from '../common';

export class RelationInputPrinter implements Printable {
  constructor(public readonly options: RelationMeta) {}

  print() {
    const { name, type } = this.options;
    if (type === 'owner') {
      return '';
    }
    const multiple = type === 'subs' ? '[multiple]="true"' : '';
    return `<wt-form-input inputType="autocomplete" ${multiple} [autocompleteService]="${name}Service" ></wt-form-input>`;
  }
}
