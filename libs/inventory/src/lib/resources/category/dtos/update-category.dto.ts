import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
