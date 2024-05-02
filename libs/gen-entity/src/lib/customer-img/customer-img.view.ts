import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICustomerImgView } from '@webpackages/gen-model';
@ViewEntity()
export class CustomerImgView implements ICustomerImgView {
  /**
   * Image url
   */
  @ViewColumn() url!: string;
  @ViewColumn() description!: string;
  @ViewColumn() customerUsername!: string;
  @ViewColumn() customerPassword!: string;
}
