import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreatePermissionDto } from './create-permission.dto';

@Exclude()
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
