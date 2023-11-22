import { Property } from '../decorators';

export class QueryDto {
  @Property({ type: 'int', default: 20, minimum: 0, parseInt: true }) take = 20;
  @Property({ type: 'int', default: 0, minimum: 0, parseInt: true }) skip = 0;
  @Property({ type: 'boolean', default: false }) withDeleted = false;

  /**
   * Convert string to ILike Operator
   */
  @Property({ type: 'string', default: '' })
  search = '';
}
