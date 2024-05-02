import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IStoreView } from '@webpackages/gen-model';
import { Store } from './store.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('store.id', 'storeId')
      .addSelect('store.description', 'description')
      .addSelect('store.checked', 'checked')

      .from(Store, 'store');
  },
})
export class StoreView implements IStoreView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
