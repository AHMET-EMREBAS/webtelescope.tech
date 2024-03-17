import { ApiProperty } from '@nestjs/swagger';
import { IBaseEntity } from '@webpackages/common';

export class BaseReadDto implements IBaseEntity {
  @ApiProperty({ type: 'integer' }) id!: number;
  @ApiProperty({ type: 'string' }) createdAt!: Date;
  @ApiProperty({ type: 'string' }) updatedAt!: Date;
  @ApiProperty({ type: 'string' }) deletedAt!: Date;
  @ApiProperty({ type: 'boolean' }) active!: boolean;
}
