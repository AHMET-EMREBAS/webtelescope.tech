import { PickType } from '@nestjs/swagger';
import { Dto } from '@webpackages/core';
import { CreateSampleDto } from './create';

@Dto()
export class UpdateSampleDto extends PickType(CreateSampleDto, ['name']) {}
