import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

@Exclude()
export class LoginWithCodeDto {
  @ApiProperty({ type: 'string' })
  @IsUUID('4')
  @IsNotEmpty()
  @Expose()
  securityCode!: string;
}
