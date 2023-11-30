import { PropertyMeta, RelationMeta } from '../../meta';
import { AbstractClassPropertyPrinter } from '../imp';

export class DtoPropertyPrinter extends AbstractClassPropertyPrinter<PropertyMeta> {}

export class DtoRelationPrinter extends AbstractClassPropertyPrinter<RelationMeta> {}
