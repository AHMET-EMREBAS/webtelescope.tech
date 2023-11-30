import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Min } from 'class-validator';

@Exclude()
export class ID {
  @Expose()
  @ApiProperty({ type: 'integer', minimum: 1 })
  @Min(1)
  id!: number;
}
