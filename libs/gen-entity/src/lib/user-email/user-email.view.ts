import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserEmailView } from '@webpackages/gen-model';
import { UserEmail } from './user-email.entity';
import { User } from '../user/user.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('userEmail.id', 'userEmailId')
      .addSelect('userEmail.email', 'email')

      .addSelect('user.username', 'userUsername')
      .from(UserEmail, 'userEmail')
      .leftJoin(User, 'user', 'user.id = userEmail.userId');
  },
})
export class UserEmailView implements IUserEmailView {
  @ViewColumn() email!: string;
  @ViewColumn() userUsername!: string;
}
