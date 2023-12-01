import { PartialType } from '@nestjs/swagger';
import { CreatePriceDto } from './create-price.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdatePriceDto extends PartialType(CreatePriceDto) {}
