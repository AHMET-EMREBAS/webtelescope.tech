import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateProjectDto } from './create-project.dto';

@Exclude()
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
