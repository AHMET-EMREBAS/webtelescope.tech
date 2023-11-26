import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateRoleDto } from './create-role.dto';

@Exclude()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
