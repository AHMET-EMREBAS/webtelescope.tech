import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserContactView } from '@webpackages/gen-model';
import { UserContact } from './user-contact.entity';
import { User } from '../user/user.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('userContact.id', 'userContactId')
      .addSelect('userContact.description', 'description')
      .addSelect('userContact.checked', 'checked')
      .addSelect('user.username', 'userUsername')
      .addSelect('user.password', 'userPassword')
      .from(UserContact, 'userContact')
      .leftJoin(User, 'user', 'user.id = userContact.userId');
  },
})
export class UserContactView implements IUserContactView {
  @ViewColumn() state!: string;
  @ViewColumn() city!: string;
  @ViewColumn() street!: string;
  @ViewColumn() zip!: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
}
