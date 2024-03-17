import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Length } from 'class-validator';

@Exclude()
export class CreateSampleDto {
  @Expose()
  @ApiProperty({ type: 'string', required: true })
  @Length(3, 50)
  name: string;
}
