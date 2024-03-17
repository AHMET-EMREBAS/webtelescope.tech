import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { IOrder, IQueryDto, IWhereOption } from '@webpackages/common';
import {
  IntegerTransformer,
  OrderTransformer,
  WhereTransformer,
} from '../transformer';

export class QueryDto implements IQueryDto<IWhereOption, IOrder> {
  @ApiProperty({
    type: 'integer',
    minimum: 1,
    maximum: 100,
    nullable: true,
    default: 20,
  })
  @IntegerTransformer()
  @IsOptional()
  take = 20;

  @ApiProperty({
    type: 'integer',
    minimum: 0,
    nullable: true,
    default: 0,
  })
  @IntegerTransformer()
  @IsOptional()
  skip = 0;

  @ApiProperty({
    type: 'string',
    example: ['name:ASC', 'id:DESC'],
    nullable: true,
  })
  @OrderTransformer()
  @IsOptional()
  order?: IOrder;

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: ['id', 'name'],
    nullable: true,
  })
  @IsString({ each: true })
  @IsOptional()
  select?: string[] | undefined;

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: 'name:contain:value',
    nullable: true,
  })
  @WhereTransformer()
  @IsOptional()
  where?: IWhereOption[] | undefined;

  @ApiProperty({ type: 'boolean', nullable: true, default: false })
  @IsBoolean()
  @IsOptional()
  withDeleted?: boolean | undefined;
}
