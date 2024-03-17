import { ApiProperty } from '@nestjs/swagger';
import { IBaseEntity } from '@webpackages/common';

export class BaseReadDto implements IBaseEntity {
  @ApiProperty({ type: 'number' }) id!: number;
  @ApiProperty({ type: 'date' }) createdAt!: Date;
  @ApiProperty({ type: 'date' }) updatedAt!: Date;
  @ApiProperty({ type: 'date' }) deletedAt!: Date;
  @ApiProperty({ type: 'boolean' }) active!: boolean;
}
