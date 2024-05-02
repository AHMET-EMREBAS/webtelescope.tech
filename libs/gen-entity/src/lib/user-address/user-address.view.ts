import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserAddressView } from '@webpackages/gen-model';
import { UserAddress } from './user-address.entity';
import { User } from '../user/user.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('userAddress.id', 'userAddressId')
      .addSelect('userAddress.state', 'state')
      .addSelect('userAddress.city', 'city')
      .addSelect('userAddress.street', 'street')
      .addSelect('userAddress.zip', 'zip')

      .addSelect('user.username', 'userUsername')
      .from(UserAddress, 'userAddress')
      .leftJoin(User, 'user', 'user.id = userAddress.userId');
  },
})
export class UserAddressView implements IUserAddressView {
  @ViewColumn() state!: string;
  @ViewColumn() city!: string;
  @ViewColumn() street!: string;
  @ViewColumn() zip!: string;
  @ViewColumn() userUsername!: string;
}
