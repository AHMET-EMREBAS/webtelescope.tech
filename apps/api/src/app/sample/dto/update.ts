import { PartialType } from '@nestjs/swagger';
import { CreateSampleDto } from './create';

export class UpdateSampleDto extends PartialType(CreateSampleDto) {}
