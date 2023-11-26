import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreatePriceDto } from './create-price.dto';

@Exclude()
export class UpdatePriceDto extends PartialType(CreatePriceDto) {}
