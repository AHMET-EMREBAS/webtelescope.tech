import { RelationMeta } from '../../meta';
import { AbstractDecoratorPrinter } from '../imp';

export class DtoRelationDecoratorPrinter extends AbstractDecoratorPrinter {
  constructor(options: RelationMeta) {
    super('Relation', options);
  }
}
