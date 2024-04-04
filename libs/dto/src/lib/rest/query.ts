import {
  BooleanProperty,
  Dto,
  NameProperty,
  NumberProperty,
  StringProperty,
  URLQueryProperty,
} from '@webpackages/property';

@Dto()
export class QueryDto {
  @NumberProperty({ default: 20 }) take?: number;

  @NumberProperty({ default: 0 }) skip?: number;

  @NameProperty({ isArray: true, required: false }) select?: string[];

  @URLQueryProperty({ required: false }) order?: Record<string, string>;

  @BooleanProperty({ required: false }) withDeleted?: boolean;

  @StringProperty({ required: false }) search?: string;

  @StringProperty({ required: false }) before?: string;

  @StringProperty({ required: false }) after?: string;
}
