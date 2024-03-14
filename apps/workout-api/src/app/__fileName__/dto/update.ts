import { PartialType } from '@nestjs/swagger';
import { Dto } from '@webpackages/entity';
import { CreateSampleDto } from './create';

@Dto()
export class UpdateSampleDto extends PartialType(CreateSampleDto) {}
