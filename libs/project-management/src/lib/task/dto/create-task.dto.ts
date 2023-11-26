import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateTaskDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  name!: string;
}
