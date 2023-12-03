import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import {
  IntergerProperty,
  PasswordColumn,
  TextColumn,
  UniqueTextColumn,
} from '../properties';
import {
  TextProperty,
  NameProperty,
  PositiveIntegerProperty,
  UsernameProperty,
  PasswordProperty,
} from '../properties';
import { Exclude } from 'class-transformer';
import { PickType } from '@nestjs/swagger';

/**
 * Base id entity
 *
 *
 */
export class BaseIDEntity {
  @PrimaryGeneratedColumn() id?: number;
}

@Exclude()
export class IDDto implements BaseIDEntity {
  @PositiveIntegerProperty({ required: true })
  id?: number;
}

/**
 * Base entity
 *
 *
 *
 *
 */
export class BaseEntity extends BaseIDEntity {
  @CreateDateColumn() createdAt?: Date;
  @UpdateDateColumn() updatedAt?: Date;
  @DeleteDateColumn() deletedAt?: Date;
  @Column({
    type: 'varchar',
    transformer: {
      to() {
        return v4();
      },
      from(value) {
        return value;
      },
    },
  })
  uuid?: string;
}

/**
 * Base name entity
 *
 *
 *
 *
 */
export class BaseNameEntity extends BaseEntity {
  @UniqueTextColumn() name!: string;
}

@Exclude()
export class BaseNameDto implements BaseNameEntity {
  @NameProperty({ required: true }) name!: string;
}

/**
 * Base name description entity
 *
 *
 *
 *
 *
 */
export class BaseNameDescriptionEntity extends BaseNameEntity {
  @TextColumn() description?: string;
}

@Exclude()
export class BaseNameAndDescriptionDto implements BaseNameDescriptionEntity {
  @NameProperty({ required: true }) name!: string;
  @TextProperty() description?: string;
}

/**
 * Base user detail entity
 *
 *
 *
 *
 *
 *
 */
export class BaseUserDetailEntity extends BaseEntity {
  @TextColumn() firstName?: string;
  @TextColumn() middleName?: string;
  @TextColumn() lastName?: string;
}

@Exclude()
export class BaseUserDetailDto implements BaseUserDetailEntity {
  @NameProperty({ required: true }) firstName?: string;
  @NameProperty({}) middleName?: string;
  @NameProperty({ required: true }) lastName?: string;
}

/**
 * Base user credential entity
 *
 *
 *
 *
 *
 */
export class BaseCredentialEntity extends BaseEntity {
  @UniqueTextColumn()
  username!: string;

  @PasswordColumn()
  password!: string;
}

@Exclude()
export class BaseCredentialDto implements BaseCredentialEntity {
  @UsernameProperty({ required: true }) username!: string;
  @PasswordProperty({ required: true }) password!: string;
}

/**
 * Used for add, remove, and set relations
 * 
 * 
 * 
 * 
 */
@Exclude()
export class RelationByIdDto {
  @IntergerProperty({ required: true }) id!: number;
  @NameProperty({ required: true }) relationName!: string;
  @IntergerProperty({ required: true }) relationId!: number;
}

/**
 * Used for set relation
 * 
 * 
 * 
 */
@Exclude()
export class RelationDto extends PickType(RelationByIdDto, [
  'id',
  'relationName',
]) {}
