import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreatePriceLevelDto } from './create-price-level.dto';

@Exclude()
export class UpdatePriceLevelDto extends PartialType(CreatePriceLevelDto) {}
