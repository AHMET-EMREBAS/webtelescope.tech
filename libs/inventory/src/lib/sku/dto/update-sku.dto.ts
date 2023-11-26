import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateSkuDto } from './create-sku.dto';

@Exclude()
export class UpdateSkuDto extends PartialType(CreateSkuDto) {}
