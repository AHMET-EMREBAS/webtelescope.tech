import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AUTH_TOKEN_NAME } from '@webpackages/common';
import { Permissions } from '@webpackages/auth';
import { ValidationPipe } from '@webpackages/rest';
import {
  CreateNotificationDto,
  QueryNotificationDto,
  UpdateNotificationDto,
} from './dto';
import { NotificationService } from './notification.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class NotificationController {
  constructor(protected readonly notificationService: NotificationService) {}

  @Permissions('notification:read')
  @Get('notifications')
  async findAllNotifications(
    @Query(ValidationPipe) query: QueryNotificationDto
  ) {
    return this.notificationService.find(query);
  }

  @Permissions('notification:read')
  @Get('notification/:id')
  findNotificationById(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.findOneById(id);
  }
  @Permissions('notification:read')
  @Post('notification')
  async save(@Body(ValidationPipe) entity: CreateNotificationDto) {
    return this.notificationService.save(entity);
  }

  @Permissions('notification:update')
  @Put('notification/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateNotificationDto
  ) {
    return this.notificationService.update(id, entity);
  }

  @Permissions('notification:delete')
  @Delete('notification/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.delete(id);
  }
}
