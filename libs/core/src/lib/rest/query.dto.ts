import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Min, Max, MaxLength, IsIn, IsOptional } from 'class-validator';

@Exclude()
export class QueryDto {
  @Expose()
  @IsOptional()
  @ApiProperty({
    type: 'integer',
    maximum: 100,
    required: false,
    minimum: 0,
    default: 20,
  })
  @Min(0)
  @Max(100)
  @Transform(({ value }) => value && parseInt(value))
  take?: number;

  @Expose()
  @IsOptional()
  @ApiProperty({
    type: 'integer',
    required: false,
    maximum: 100,
    minimum: 0,
    default: 0,
  })
  @Min(0)
  @Transform(({ value }) => value && parseInt(value))
  skip?: number;

  @Expose()
  @IsOptional()
  @ApiProperty({ type: 'boolean', required: false, default: false })
  @Transform(({ value }) => value === 'true')
  withDeleted?: boolean;

  @Expose()
  @IsOptional()
  @ApiProperty({ type: 'string', required: false })
  @MaxLength(30)
  orderBy?: string;

  @Expose()
  @IsOptional()
  @ApiProperty({ type: 'string', required: false, enum: ['ASC', 'DESC'] })
  @IsIn(['ASC', 'DESC'])
  orderDir?: 'ASC' | 'DESC';

  @Expose()
  @IsOptional()
  @ApiProperty({ type: 'string', required: false })
  @MaxLength(30)
  search?: string;
}
