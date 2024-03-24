import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class Signup {
  @Expose()
  @ApiProperty()
  username: string;

  password: string;

  organization: string;
}
