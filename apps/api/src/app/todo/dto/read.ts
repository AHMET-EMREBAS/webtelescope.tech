import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '../entity';

export class ReadTodoDto implements Todo {
  @ApiProperty({ type: 'number' }) id!: number;
  @ApiProperty({ type: 'string' }) name!: string;
  @ApiProperty({ type: 'date' }) createdAt!: Date;
  @ApiProperty({ type: 'date' }) updatedAt!: Date;
  @ApiProperty({ type: 'date' }) deletedAt!: Date;
  @ApiProperty({ type: 'boolean' }) active!: boolean;
}
