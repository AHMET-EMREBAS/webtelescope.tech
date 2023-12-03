import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import {
  BooleanProperty,
  EnumProperty,
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
import { ApiProperty, PickType } from '@nestjs/swagger';

/**
 * Base id entity
 *
 *
 */
export class BaseIDEntity {
  @ApiProperty({ type: 'integer' })
  @PrimaryGeneratedColumn()
  id?: number;
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
  @ApiProperty({ type: Date }) @CreateDateColumn() createdAt?: Date;
  @ApiProperty({ type: Date }) @UpdateDateColumn() updatedAt?: Date;
  @ApiProperty({ type: Date }) @DeleteDateColumn() deletedAt?: Date;
  @ApiProperty({ type: 'string' })
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

  @ApiProperty({ type: 'integer' })
  @Column({ type: 'numeric', nullable: true })
  createdBy?: number;

  @ApiProperty({ type: 'integer' })
  @Column({ type: 'numeric', nullable: true })
  updatedBy?: number;
}

/**
 * Base name entity
 *
 *
 *
 *
 */
export class BaseNameEntity extends BaseEntity {
  @ApiProperty({ type: 'string' })
  @UniqueTextColumn()
  name!: string;
}

@Exclude()
export class BaseNameDto implements BaseNameEntity {
  @NameProperty({ required: true })
  name!: string;
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
  @ApiProperty({ type: 'string' })
  @TextColumn()
  description?: string;
}

@Exclude()
export class BaseNameAndDescriptionDto implements BaseNameDescriptionEntity {
  @NameProperty({ required: true })
  name!: string;

  @TextProperty()
  description?: string;
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
  @ApiProperty({ type: 'string' }) @TextColumn() firstName?: string;
  @ApiProperty({ type: 'string' }) @TextColumn() middleName?: string;
  @ApiProperty({ type: 'string' }) @TextColumn() lastName?: string;
}

@Exclude()
export class BaseUserDetailDto implements BaseUserDetailEntity {
  @NameProperty({ required: true })
  firstName?: string;

  @NameProperty({})
  middleName?: string;

  @NameProperty({ required: true })
  lastName?: string;
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
  @ApiProperty({ type: 'string' })
  @UniqueTextColumn()
  username!: string;

  @ApiProperty({ type: 'string' })
  @PasswordColumn()
  password!: string;
}

@Exclude()
export class BaseCredentialDto implements BaseCredentialEntity {
  @UsernameProperty({ required: true })
  username!: string;

  @PasswordProperty({ required: true })
  password!: string;
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

/**
 * Query dto
 *
 */

export type OrderDirection = 'asc' | 'desc' | 'ASC' | 'DESC';

@Exclude()
export class QueryDto {
  @PositiveIntegerProperty({ fromQuery: true, example: 20, maximum: 100 })
  take?: number;

  @PositiveIntegerProperty({ fromQuery: true, example: 0 })
  skip?: number;

  @BooleanProperty({ fromQuery: true, example: false })
  withDeleted?: boolean;

  @TextProperty({ fromQuery: true })
  orderBy?: string;

  @EnumProperty({ enum: ['asc', 'desc', 'ASC', 'DESC'] })
  orderDir?: OrderDirection;

  @TextProperty({ fromQuery: true })
  search?: string;
}
