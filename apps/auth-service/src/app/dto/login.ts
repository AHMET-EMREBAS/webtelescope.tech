import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class Login {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @Expose()
  @IsNotEmpty()
  password: string;
}
