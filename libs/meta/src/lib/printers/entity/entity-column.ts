/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToInstance } from 'class-transformer';
import {
  AllValidationMeta,
  PrintablePropertyMeta,
  RelationMeta,
} from '../../meta';
import { AbstractClassPropertyPrinter } from '../imp';
import { EntityColumnDecoratorPrinter } from './entity-column-decorator';
import { EntityRelationDecoratorPrinter } from './entity-relation-decorator';

export class EntityColumnPrinter extends AbstractClassPropertyPrinter<PrintablePropertyMeta> {
  constructor(options: PrintablePropertyMeta) {
    const decoratorOptions = plainToInstance<any, any>(
      AllValidationMeta,
      options,
      { exposeUnsetFields: false }
    );
    super(options, [new EntityColumnDecoratorPrinter(decoratorOptions)]);
  }
}

export class EntityRelationPrinter extends AbstractClassPropertyPrinter<RelationMeta> {
  constructor(options: RelationMeta) {
    const decoratorOptions = plainToInstance<any, any>(RelationMeta, options, {
      exposeUnsetFields: false,
    });
    super(options, [new EntityRelationDecoratorPrinter(decoratorOptions)]);
  }

  override printType(): string {
    if (this.options.type === 'subs') {
      return `${this.options.target}[]`;
    }
    return `${this.options.target}`;
  }
}
