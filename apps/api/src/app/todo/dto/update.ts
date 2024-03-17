import { PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
