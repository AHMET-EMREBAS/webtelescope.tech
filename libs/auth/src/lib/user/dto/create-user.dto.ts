import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  name!: string;
}
