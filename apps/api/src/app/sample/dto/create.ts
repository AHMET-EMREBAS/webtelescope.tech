import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateSampleDto {
  @ApiProperty({ type: 'string', required: true })
  @Length(3, 50)
  name: string;
}
