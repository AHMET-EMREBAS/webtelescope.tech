/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToInstance } from 'class-transformer';
import {
  AllValidationMeta,
  PrintablePropertyMeta,
  RelationMeta,
} from '../../meta';
import { AbstractClassPropertyPrinter } from '../imp';
import { DtoPropertyDecoratorPrinter } from './dto-property-decorator';
import { DtoRelationDecoratorPrinter } from './dto-relation-decorator';

export class DtoPropertyPrinter extends AbstractClassPropertyPrinter<PrintablePropertyMeta> {
  constructor(options: PrintablePropertyMeta) {
    const decoratorOptions = plainToInstance<any, any>(
      AllValidationMeta,
      options,
      { exposeUnsetFields: false }
    );
    super(options, [new DtoPropertyDecoratorPrinter(decoratorOptions)]);
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
      return `ID[]`;
    } else {
      return 'ID';
    }
  }
}
