import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateSprintDto } from './create-sprint.dto';

@Exclude()
export class UpdateSprintDto extends PartialType(CreateSprintDto) {}
