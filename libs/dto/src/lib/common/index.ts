import {
  ICreateAddressDto,
  ICreateCommentDto,
  ICreateCounterDto,
  ICreateEmailDto,
  ICreateImageDto,
  ICreateUrlDto,
  ICreatePhoneDto,
  ICreateRecord,
  ICreateReviewDto,
  ICreateTagDto,
  IID,
  Range5,
  ICreateCategoryDto,
} from '@webpackages/model';
import {
  Dto,
  EmailProperty,
  NameProperty,
  NumberProperty,
  ObjectIdProperty,
  ObjectProperty,
  PhoneProperty,
  RequiredTextProperty,
  URLProperty,
} from '@webpackages/property';

@Dto()
export class CreateEmailDto implements ICreateEmailDto {
  @EmailProperty() email!: string;
  @ObjectIdProperty() user!: IID;
}

@Dto()
export class CreateAddressDto implements ICreateAddressDto {
  @ObjectIdProperty() user!: IID;
  @RequiredTextProperty() street!: string;
  @RequiredTextProperty() unit!: string;
  @RequiredTextProperty() city!: string;
  @RequiredTextProperty() state!: string;
  @RequiredTextProperty() zip!: string;
  @RequiredTextProperty() country!: string;
}

@Dto()
export class CreatePhoneDto implements ICreatePhoneDto {
  @ObjectIdProperty() user!: IID;
  @PhoneProperty() phone!: string;
}

@Dto()
export class CreateCounterDto implements ICreateCounterDto {
  @ObjectIdProperty() user!: IID;
  @ObjectIdProperty() target!: IID;
}

@Dto()
export class CreateRecordDto implements ICreateRecord {
  @ObjectIdProperty() owner!: IID;
  @ObjectProperty() record!: Record<string, string>;
}

@Dto()
export class CreateCommentDto implements ICreateCommentDto {
  @ObjectIdProperty() user!: IID;
  @ObjectIdProperty() target!: IID;
  @RequiredTextProperty() comment!: string;
}

@Dto()
export class CreateReviewDto implements ICreateReviewDto {
  @ObjectIdProperty() user!: IID;
  @ObjectIdProperty() target!: IID;
  @NumberProperty({ required: true, minimum: 1, maximum: 5 }) rate!: Range5;
  @RequiredTextProperty() comment!: string;
}

@Dto()
export class CreateTagDto implements ICreateTagDto {
  @NameProperty() tag!: string;
}

@Dto()
export class CreateImgDto implements ICreateImageDto {
  @ObjectIdProperty() owner!: IID;
  @NameProperty() imageName!: string;
}

@Dto()
export class CreateUrlDto implements ICreateUrlDto {
  @ObjectIdProperty() owner!: IID;
  @URLProperty() url!: string;
}

@Dto()
export class CreateCategoryDto implements ICreateCategoryDto {
  @NameProperty() category!: string;
}
