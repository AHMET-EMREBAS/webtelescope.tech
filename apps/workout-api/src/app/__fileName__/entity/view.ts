import { ViewEntity, DataSource, ViewColumn } from 'typeorm';
import { Sample } from './entity';

@ViewEntity({
  expression(ds: DataSource) {
    return ds
      .createQueryBuilder()
      .select('main.id', 'id')
      .from(Sample, 'main');
  },
})
export class SampleView {
  @ViewColumn() id!: number;

}
