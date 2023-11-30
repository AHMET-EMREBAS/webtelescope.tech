import { plainToInstance } from 'class-transformer';
import { AllRelationOptions, RelationMeta } from '../../meta';
import { AbstractDecoratorPrinter } from '../imp';

export class DtoRelationDecoratorPrinter extends AbstractDecoratorPrinter {
  constructor(options: RelationMeta) {
    const __options = plainToInstance(AllRelationOptions, options);
    super('Relation', __options);
  }
}
