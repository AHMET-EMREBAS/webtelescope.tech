import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICartView } from '@webpackages/gen-model';
@ViewEntity()
export class CartView implements ICartView {
  @ViewColumn() description!: string;
  /**
   * Is chart checked out or not?
   */ @ViewColumn() checked!: boolean;
  @ViewColumn() customerUsername!: string;
  @ViewColumn() customerPassword!: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
  @ViewColumn() storeName!: string;
}
