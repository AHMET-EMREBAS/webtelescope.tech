import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateCategoryDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  name!: string;
}
