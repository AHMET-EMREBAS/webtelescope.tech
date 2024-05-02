import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IStoreView } from '@webpackages/common';
@ViewEntity()
export class StoreView implements IStoreView {
  /**
   * Required unique short text
   */ @ViewColumn() name!: string;
}
