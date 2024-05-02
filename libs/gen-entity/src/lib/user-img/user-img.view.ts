import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserImgView } from '@webpackages/gen-model';
import { UserImg } from './user-img.entity';
import { BaseView } from '@webpackages/core';
import { User } from '../user/user.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('userImg.id', 'id')
      .addSelect('userImg.url', 'url')
      .addSelect('userImg.description', 'description')

      .addSelect('user.username', 'userUsername')
      .from(UserImg, 'userImg')
      .leftJoin(User, 'user', 'user.id = userImg.userId');
  },
})
export class UserImgView extends BaseView implements IUserImgView {
  /**
   * Image url
   */
  @ViewColumn() url!: string;
  @ViewColumn() description!: string;
  @ViewColumn() userUsername!: string;
}
