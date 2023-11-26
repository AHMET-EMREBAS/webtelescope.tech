import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateRoleDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  name!: string;
}
