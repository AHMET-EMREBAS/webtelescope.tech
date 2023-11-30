/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToInstance } from 'class-transformer';
import {
  AllValidationMeta,
  PrintablePropertyMeta,
  RelationMeta,
} from '../../meta';
import { AbstractClassPropertyPrinter } from '../imp';
import { EntityColumnDecoratorPrinter } from './entity-property-decorator';
import { DtoRelationDecoratorPrinter } from './entity-relation-decorator';

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

export class DtoRelationPrinter extends AbstractClassPropertyPrinter<RelationMeta> {
  constructor(options: RelationMeta) {
    const decoratorOptions = plainToInstance<any, any>(RelationMeta, options, {
      exposeUnsetFields: false,
    });
    super(options, [new DtoRelationDecoratorPrinter(decoratorOptions)]);
  }

  override printType(): string {
    if (this.options.type === 'subs') {
      return `${this.options.target}[]`;
    }
    return `${this.options.target}`;
  }
}
