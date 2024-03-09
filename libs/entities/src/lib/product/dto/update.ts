import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create';
import { Dto } from '@webpackages/core';

@Dto()
export class UpdateProductDto extends PartialType(CreateProductDto) {}
