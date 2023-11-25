import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateSampleDto } from './create';

@Exclude()
export class UpdateSampleDto extends PartialType(CreateSampleDto) {}
