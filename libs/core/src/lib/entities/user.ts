import { Entity } from 'typeorm';
import {
  BooleanColumn,
  BooleanProperty,
  ManyRelation,
  ObjectId,
  ObjectIdProperty,
  OwnerRelation,
  TextColumn,
  TextProperty,
  URLProperty,
  UniqueTextColumn,
  UsernameProperty,
} from '../properties';
import {
  BaseCredentialEntity,
  BaseEntity,
  BaseIDEntity,
  BaseNameEntity,
  BaseUserDetailEntity,
  BaseCredentialDto,
  BaseNameDto,
  BaseUserDetailDto,
  BaseNameDescriptionEntity,
  BaseNameAndDescriptionDto,
} from './__base-entities';
import { Exclude } from 'class-transformer';
import { PartialType, PickType } from '@nestjs/swagger';

/**
 * Permission
 *
 *
 */
@Entity()
export class Permission extends BaseNameEntity {}

@Exclude()
export class CreatePermissionDto extends BaseNameDto {}

@Exclude()
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}

/**
 * Role
 *
 *
 *
 */
@Entity()
export class Role<
  TPermission extends BaseIDEntity = Permission
> extends BaseNameEntity {
  @ManyRelation({ target: Permission })
  permissions!: TPermission[];
}

@Exclude()
export class CreateRoleDto extends BaseNameDto implements Role<ObjectId> {
  @ObjectIdProperty({ required: true, isArray: true }) permissions!: ObjectId[];
}

@Exclude()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}

/**
 * User Credential
 *
 *
 *
 */
@Entity()
export class User<
  TRole extends BaseIDEntity = Role
> extends BaseCredentialEntity {
  @ManyRelation({ target: Role })
  roles!: TRole[];
}

@Exclude()
export class CreateUserDto extends BaseCredentialDto implements User<ObjectId> {
  @ObjectIdProperty({ required: true, isArray: true }) roles!: ObjectId[];
  @ObjectIdProperty({ required: true }) user!: ObjectId;
}

@Exclude()
export class UpdateUserDto extends PartialType(CreateUserDto) {}

/**
 * Notification entity
 *
 *
 *
 *
 */
@Entity()
export class Notification extends BaseNameDescriptionEntity {
  @BooleanColumn() read?: boolean;
  @OwnerRelation({ target: User }) user!: User;
}

@Exclude()
export class CreateNotificationDto extends BaseNameAndDescriptionDto {}

@Exclude()
export class UpdateNotificationDto {
  @BooleanProperty({ required: true }) read?: boolean;
}

/**
 * Notification entity
 *
 *
 *
 *
 */
@Entity()
export class Message<TUser extends BaseEntity = User> extends BaseEntity {
  @TextColumn() message!: string;
  @OwnerRelation({ target: User }) to!: TUser;
}

@Exclude()
export class CreateMessageDto implements Message<ObjectId> {
  @TextProperty({ required: true }) message!: string;
  @ObjectIdProperty({ required: true }) to!: ObjectId;
}

@Exclude()
export class UpdateMessageDto extends PartialType(
  PickType(CreateMessageDto, ['message'])
) {}

/**
 * User Detail
 *
 *
 *
 */
@Entity()
export class UserDetail<
  TUser extends BaseIDEntity = User
> extends BaseUserDetailEntity {
  @OwnerRelation({ target: User })
  user!: TUser;
}

@Exclude()
export class CreateUserDetailDto
  extends BaseUserDetailDto
  implements UserDetail<ObjectId>
{
  @ObjectIdProperty({ required: true }) user!: ObjectId;
}

@Exclude()
export class UpdateUserDetailDto extends PartialType(CreateUserDetailDto) {}

/**
 * User Email
 *
 *
 *
 *
 */
@Entity()
export class UserEmail<TUser extends BaseIDEntity = User> extends BaseEntity {
  @UniqueTextColumn()
  email!: string;

  @OwnerRelation({ target: User })
  user!: TUser;
}

@Exclude()
export class CreateUserEmailDto implements UserEmail<ObjectId> {
  @UsernameProperty({ required: true }) email!: string;
  @ObjectIdProperty({ required: true }) user!: ObjectId;
}

@Exclude()
export class UpdateUserEmailDto extends PartialType(CreateUserEmailDto) {}

/**
 * User phone
 *
 *
 *
 *
 */
@Entity()
export class UserPhone<TUser extends BaseIDEntity = User> extends BaseEntity {
  @UniqueTextColumn()
  phone!: string;

  @OwnerRelation({ target: User })
  user!: TUser;
}

@Exclude()
export class CreateUserPhoneDto implements UserPhone<ObjectId> {
  @UsernameProperty({ required: true }) phone!: string;
  @ObjectIdProperty({ required: true }) user!: ObjectId;
}

@Exclude()
export class UpdateUserPhoneDto extends PartialType(CreateUserPhoneDto) {}

/**
 * User image
 *
 *
 *
 *
 */
@Entity()
export class UserImage<TUser extends BaseIDEntity = User> extends BaseEntity {
  @TextColumn()
  url!: string;

  @OwnerRelation({ target: User })
  user!: TUser;
}

@Exclude()
export class CreateUserImageDto implements UserImage<ObjectId> {
  @URLProperty({ required: true }) url!: string;
  @ObjectIdProperty({ required: true }) user!: ObjectId;
}

@Exclude()
export class UpdateUserImageDto extends PartialType(CreateUserImageDto) {}
