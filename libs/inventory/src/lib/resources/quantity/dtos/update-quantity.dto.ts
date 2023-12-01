import { PartialType } from '@nestjs/swagger';
import { CreateQuantityDto } from './create-quantity.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateQuantityDto extends PartialType(CreateQuantityDto) {}
