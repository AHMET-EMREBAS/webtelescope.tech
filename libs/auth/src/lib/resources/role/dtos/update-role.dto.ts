import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
