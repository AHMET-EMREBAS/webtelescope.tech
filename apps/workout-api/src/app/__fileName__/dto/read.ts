import { Dto, Property } from '@webpackages/entity';
import { Sample } from '../entity';

@Dto()
export class ReadSampleDto implements Sample {
  @Property({ type: 'number' }) id: number;
  @Property({ type: 'string' }) name: string;
  @Property({ type: 'date' }) createdAt: Date;
  @Property({ type: 'date' }) updatedAt: Date;
  @Property({ type: 'date' }) deletedAt: Date;
  @Property({ type: 'boolean' }) active: boolean;
}
