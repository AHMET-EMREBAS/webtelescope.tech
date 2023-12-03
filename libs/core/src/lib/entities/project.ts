import { Entity } from 'typeorm';
import {
  BaseEntity,
  BaseIDEntity,
  BaseNameAndDescriptionDto,
  BaseNameDescriptionEntity,
  BaseNameDto,
  BaseNameEntity,
} from './__base-entities';
import { Exclude } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import {
  DateColumn,
  DateProperty,
  ManyRelation,
  ObjectId,
  ObjectIdProperty,
  OwnerRelation,
  TextColumn,
  TextProperty,
} from '../properties';
import { User } from './user';

/**
 * Project entity
 *
 *
 *
 *
 *
 */
@Entity()
export class Project extends BaseNameEntity {}

@Exclude()
export class CreateProjectDto extends BaseNameDto {}

@Exclude()
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

/**
 * Sprint entity
 *
 *
 *
 *
 *
 *
 */
@Entity()
export class Sprint<
  TProject extends BaseIDEntity = Project
> extends BaseNameEntity {
  @OwnerRelation({ target: Project }) project!: TProject;
}

@Exclude()
export class CreateSprintDto extends BaseNameDto implements Sprint<ObjectId> {
  @ObjectIdProperty({ required: true }) project!: ObjectId;
}

@Exclude()
export class UpdateSprintDto extends PartialType(CreateSprintDto) {}

/**
 * Task entity
 *
 *
 *
 *
 *
 *
 */
@Entity()
export class Task<
  TSprint extends BaseIDEntity = Sprint,
  TUser extends BaseIDEntity = User
> extends BaseNameDescriptionEntity {
  @TextColumn() status!: string;
  @TextColumn() priority!: string;
  @DateColumn() due!: Date;
  @OwnerRelation({ target: Sprint }) sprint!: TSprint;
  @ManyRelation({ target: User }) users!: TUser[];
}

@Exclude()
export class CreateTaskDto
  extends BaseNameAndDescriptionDto
  implements Task<ObjectId, ObjectId>
{
  @DateProperty({ required: true })
  due!: Date;

  @TextProperty({ required: true })
  status!: string;

  @TextProperty({ required: true })
  priority!: string;

  @ObjectIdProperty({ required: true })
  sprint!: ObjectId;

  @ObjectIdProperty({ required: true, isArray: true })
  users!: ObjectId[];
}

@Exclude()
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

/**
 * Comment Entity
 *
 *
 *
 *
 */
@Entity()
export class Comment<
  TUser extends BaseIDEntity = User,
  TTask extends BaseIDEntity = Task
> extends BaseEntity {
  @TextColumn() comment!: string;
  @OwnerRelation({ target: User }) user!: TUser;
  @OwnerRelation({ target: Task }) task!: TTask;
}

@Exclude()
export class CreateCommentDto implements Comment<ObjectId, ObjectId> {
  @TextProperty({ required: true }) comment!: string;
  @ObjectIdProperty({ required: true }) user!: ObjectId;
  @ObjectIdProperty({ required: true }) task!: ObjectId;
}

@Exclude()
export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
