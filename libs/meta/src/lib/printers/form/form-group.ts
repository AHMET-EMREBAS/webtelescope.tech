import { ModelMeta } from '../../meta';
import { Printable } from '../common';

export class FormGroupPrinter implements Printable {
  constructor(public readonly options: ModelMeta) {}

  printRelationControl(): string {
    return Object.values(this.options.relations || {})
      .map(() => {
        return `new FormControl('')`;
      })
      .join(',\n');
  }
  
  printInputControl(): string {
    return Object.entries(this.options.properties || {})
      .map(([, value]) => {
        const type = value.type;

        if (type === 'string') {
          const { required, minLength, maxLength, isIn, format } = value;
          const validators: string[] = [];
          if (required) validators.push(`Validators.required`);
          if (minLength != undefined)
            validators.push(`Validators.minLength(${minLength})`);
          if (maxLength != undefined)
            validators.push(`Validators.maxLength(${maxLength})`);

          if (isIn != undefined)
            validators.push(
              `Validator.pattern(/${isIn.map((e) => `'${e}'`).join('|')}/)`
            );

          if (format) {
            if (format === 'barcode') {
              validators.push(`Validators.minLength(12)`);
              validators.push(`Validators.maxLength(13)`);
            } else if (format === 'email') {
              validators.push('Validators.email');
            } else if (format === 'password') {
              validators.push('PasswordValidator');
            }
          }
          return `new FormControl('', [${validators.join(', ')}])`;
        } else if (type === 'number') {
          const validators: string[] = [];
          const { max, min } = value;

          if (max != undefined) validators.push(`Validators.max(${max})`);
          if (min != undefined) validators.push(`Validators.min(${min})`);

          return `new FormControl('', [${validators.join(', ')}])`;
        } else {
          return `new FormControl('')`;
        }
      })
      .join(',\n');
  }

  print(): string {
    return `
    formGroup = new FormGroup({ 
        ${this.printInputControl()}
        ${this.printRelationControl()}
    })
    `;
  }
}
