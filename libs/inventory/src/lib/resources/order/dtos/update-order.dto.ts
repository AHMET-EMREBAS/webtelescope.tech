import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
