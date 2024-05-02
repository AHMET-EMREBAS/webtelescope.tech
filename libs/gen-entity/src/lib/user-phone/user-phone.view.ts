import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserPhoneView } from '@webpackages/gen-model';
import { UserPhone } from './user-phone.entity';
import { User } from '../user/user.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('userPhone.id', 'userPhoneId')
      .addSelect('userPhone.description', 'description')
      .addSelect('userPhone.checked', 'checked')
      .addSelect('user.username', 'userUsername')
      .addSelect('user.password', 'userPassword')
      .from(UserPhone, 'userPhone')
      .leftJoin(User, 'user', 'user.id = userPhone.userId');
  },
})
export class UserPhoneView implements IUserPhoneView {
  @ViewColumn() email!: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
}
