import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

@Exclude()
export class UpdateUserDto extends PartialType(CreateUserDto) {}
