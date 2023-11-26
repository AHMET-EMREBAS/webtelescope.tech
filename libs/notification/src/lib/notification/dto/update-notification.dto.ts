import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateNotificationDto } from './create-notification.dto';

@Exclude()
export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {}
