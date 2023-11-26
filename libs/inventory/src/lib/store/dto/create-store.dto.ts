import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { MaxLength, MinLength } from 'class-validator';

@Exclude()
export class CreateStoreDto {
  @ApiProperty({ type: 'string', minLength: 3, maxLength: 50 })
  @MinLength(3)
  @MaxLength(50)
  @Expose()
  name!: string;
}
