import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserImgView } from '@webpackages/gen-model';
import { UserImg } from './user-img.entity';
import { User } from '../user/user.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('userImg.id', 'userImgId')
      .addSelect('userImg.description', 'description')
      .addSelect('userImg.checked', 'checked')
      .addSelect('user.username', 'userUsername')
      .addSelect('user.password', 'userPassword')
      .from(UserImg, 'userImg')
      .leftJoin(User, 'user', 'user.id = userImg.userId');
  },
})
export class UserImgView implements IUserImgView {
  /**
   * Image url
   */
  @ViewColumn() url!: string;
  @ViewColumn() description!: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
}
