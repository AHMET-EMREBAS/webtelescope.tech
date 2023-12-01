import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateProductDto extends PartialType(CreateProductDto) {}
