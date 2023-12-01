import { Exclude } from 'class-transformer';
import { Property } from '../validation';

@Exclude()
export class IdDto {
  @Property({ type: 'integer', minimum: 1 })
  id!: number;
}
