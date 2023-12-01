import { PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permission.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
