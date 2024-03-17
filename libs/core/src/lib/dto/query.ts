import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsNumberString, IsOptional } from 'class-validator';
import {
  IOrder,
  IQueryDto,
  IWhereOption,
  ObjectLiteral,
} from '@webpackages/common';

export class QueryDto<T extends ObjectLiteral> implements IQueryDto<T> {
  @ApiProperty({
    type: 'integer',
    minimum: 1,
    maximum: 100,
    nullable: true,
    default: 20,
  })
  @IsNumberString()
  @IsOptional()
  take = 20;

  @ApiProperty({
    type: 'integer',
    minimum: 0,
    nullable: true,
    default: 0,
  })
  @IsNumberString()
  @IsOptional()
  skip = 0;

  @ApiProperty({ type: 'string' })
  order?: IOrder<T> = {};

  @ApiProperty({ type: 'string' })
  @IsOptional()
  select?: (keyof T)[] = [];

  where?: IWhereOption<T>[] | undefined;

  @ApiProperty({ type: 'boolean', nullable: true, default: false })
  @IsBooleanString()
  @IsOptional()
  withDeleted = false;
}
