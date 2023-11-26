import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateQuantityDto } from './create-quantity.dto';

@Exclude()
export class UpdateQuantityDto extends PartialType(CreateQuantityDto) {}
