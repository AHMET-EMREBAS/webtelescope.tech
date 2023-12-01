import { PartialType } from '@nestjs/swagger';
import { CreateSkuDto } from './create-sku.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateSkuDto extends PartialType(CreateSkuDto) {}
