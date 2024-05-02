import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IStoreView } from '@webpackages/gen-model';
@ViewEntity()
export class StoreView implements IStoreView {
  /**
   * Required unique short text
   */ @ViewColumn() name!: string;
}
