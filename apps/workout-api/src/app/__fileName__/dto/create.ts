import { Dto, Property } from '@webpackages/entity';

@Dto()
export class CreateSampleDto {
  @Property({ type: 'string', required: true })
  name!: string;
}
