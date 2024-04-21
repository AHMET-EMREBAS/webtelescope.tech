import {
  ICreateSampleDto,
  IQuerySampleDto,
  ISample,
  ISampleView,
} from '@webpackages/common';

import {
  Entity,
  Column,
  IDEntity,
  Dto,
  Property,
  QueryProperty,
  PickType,
  ViewColumn,
  ViewEntity,
} from '@webpackages/core';

@Entity()
export class Sample extends IDEntity implements ISample {
  @Column({ type: 'string', unique: true }) name!: string;
}

@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('m.id', 'sampleId')
      .addSelect('m.name', 'sampleName')
      .from(Sample, 'm');
  },
})
export class SampleView implements ISampleView {
  @ViewColumn() sampleId!: number;
  @ViewColumn() sampleName!: string;
}

@Dto()
export class CreateSampleDto implements ICreateSampleDto {
  @Property({ type: 'string', minLength: 3, maxLength: 30 })
  name!: string;
}

@Dto()
export class UpdateSampleDto extends PickType(CreateSampleDto, ['name']) {}

@Dto()
export class QuerySampleDto implements IQuerySampleDto {
  @Property({ type: 'string' })
  @QueryProperty()
  name?: string;
}
