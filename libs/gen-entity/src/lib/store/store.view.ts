import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IStoreView } from '@webpackages/gen-model';
import { Store } from './store.entity';
import { BaseView } from '@webpackages/core';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('store.id', 'id')
      .addSelect('store.name', 'name')

      .from(Store, 'store');
  },
})
export class StoreView extends BaseView implements IStoreView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
