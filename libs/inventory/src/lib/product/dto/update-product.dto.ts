import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateProductDto } from './create-product.dto';

@Exclude()
export class UpdateProductDto extends PartialType(CreateProductDto) {}
