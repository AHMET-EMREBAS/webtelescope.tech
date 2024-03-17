import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Max } from 'class-validator';
import { IOrder, IQueryDto, IWhereOption } from '@webpackages/common';
import {
  BooleanTransformer,
  IntegerTransformer,
  OrderTransformer,
  StringOrArrayTransformer,
  WhereTransformer,
} from '../transformer';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class QueryDto implements IQueryDto<IWhereOption, IOrder> {
  @Expose()
  @ApiProperty({
    type: 'integer',
    minimum: 1,
    maximum: 100,
    required: false,
    default: 20,
  })
  @Max(200)
  @IntegerTransformer(20)
  @IsOptional()
  take?: number;

  @Expose()
  @ApiProperty({
    type: 'integer',
    minimum: 0,
    required: false,
    default: 0,
  })
  @IntegerTransformer()
  @IsOptional()
  skip?: number;

  @Expose()
  @ApiProperty({
    type: 'string',
    isArray: true,
    example: ['name:ASC', 'id:DESC'],
    required: false,
  })
  @OrderTransformer()
  @IsOptional()
  order?: IOrder[];

  @Expose()
  @ApiProperty({
    type: 'string',
    isArray: true,
    example: ['id', 'name'],
    required: false,
  })
  @IsString({ each: true })
  @StringOrArrayTransformer()
  @IsOptional()
  select?: string[];

  @Expose()
  @ApiProperty({
    type: 'string',
    isArray: true,
    example: 'name:contain:value',
    required: false,
  })
  @WhereTransformer()
  @IsOptional()
  where?: IWhereOption[];

  @Expose()
  @ApiProperty({ type: 'boolean', required: false, default: false })
  @BooleanTransformer()
  @IsBoolean()
  @IsOptional()
  withDeleted?: boolean;
}
