import { Entity } from 'typeorm';
import {
  ManyRelation,
  ObjectId,
  ObjectIdProperty,
  OwnerRelation,
  TextColumn,
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
} from './__base-entities';
import { Exclude } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

/**
 * User
 *
 *
 */
@Entity()
export class User extends BaseEntity {}

@Exclude()
export class CreateUserDto implements User {}

@Exclude()
export class UpdateUserDto extends PartialType(CreateUserDto) {}

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
export class UserCredential<
  TRole extends BaseIDEntity = Role,
  TUser extends BaseIDEntity = User
> extends BaseCredentialEntity {
  @ManyRelation({ target: Role })
  roles!: TRole[];

  @OwnerRelation({ target: User })
  user!: TUser;
}

@Exclude()
export class CreateUserCredentialDto
  extends BaseCredentialDto
  implements UserCredential<ObjectId, ObjectId>
{
  @ObjectIdProperty({ required: true, isArray: true }) roles!: ObjectId[];
  @ObjectIdProperty({ required: true }) user!: ObjectId;
}

@Exclude()
export class UpdateUserCredentialDto extends PartialType(
  CreateUserCredentialDto
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

export class UpdateUserImageDto extends PartialType(CreateUserImageDto) {}
