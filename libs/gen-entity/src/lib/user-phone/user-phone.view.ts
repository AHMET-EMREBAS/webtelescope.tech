import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserPhoneView } from '@webpackages/gen-model';
import { UserPhone } from './user-phone.entity';
import { BaseView } from '@webpackages/core';
import { User } from '../user/user.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('userPhone.id', 'id')
      .addSelect('userPhone.phone', 'phone')

      .addSelect('user.username', 'userUsername')
      .from(UserPhone, 'userPhone')
      .leftJoin(User, 'user', 'user.id = userPhone.userId');
  },
})
export class UserPhoneView extends BaseView implements IUserPhoneView {
  @ViewColumn() phone!: string;
  @ViewColumn() userUsername!: string;
}
