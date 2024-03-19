import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

@Exclude()
export class UpdatePasswordDto {
  @ApiProperty({ type: 'string' })
  @IsStrongPassword()
  @IsNotEmpty()
  @Expose()
  password!: string;
}
