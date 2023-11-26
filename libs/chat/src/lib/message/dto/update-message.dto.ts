import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateMessageDto } from './create-message.dto';

@Exclude()
export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
