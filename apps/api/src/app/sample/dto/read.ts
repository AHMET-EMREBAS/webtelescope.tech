import { ApiProperty } from '@nestjs/swagger';
import { Sample } from '../entity';

export class ReadSampleDto implements Sample {
  @ApiProperty({ type: 'number' }) id!: number;
  @ApiProperty({ type: 'string' }) name!: string;
  @ApiProperty({ type: 'date' }) createdAt!: Date;
  @ApiProperty({ type: 'date' }) updatedAt!: Date;
  @ApiProperty({ type: 'date' }) deletedAt!: Date;
  @ApiProperty({ type: 'boolean' }) active!: boolean;
}
