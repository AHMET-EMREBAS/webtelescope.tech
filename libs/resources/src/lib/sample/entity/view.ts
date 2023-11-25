import { ViewColumn, ViewEntity } from 'typeorm';
import { Sample } from './entity';

@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('main.id', 'id')
      .addSelect('main.name', 'name')
      .from(Sample, 'main');
  },
})
export class SampleView {
  @ViewColumn() id!: number;
}
