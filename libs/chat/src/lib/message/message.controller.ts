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
import { CreateMessageDto, QueryMessageDto, UpdateMessageDto } from './dto';
import { MessageService } from './message.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class MessageController {
  constructor(protected readonly messageService: MessageService) {}

  @Permissions('message:read')
  @Get('messages')
  async findAllMessages(@Query(ValidationPipe) query: QueryMessageDto) {
    return this.messageService.find(query);
  }

  @Permissions('message:read')
  @Get('message/:id')
  findMessageById(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.findOneById(id);
  }
  @Permissions('message:read')
  @Post('message')
  async save(@Body(ValidationPipe) entity: CreateMessageDto) {
    return this.messageService.save(entity);
  }

  @Permissions('message:update')
  @Put('message/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateMessageDto
  ) {
    return this.messageService.update(id, entity);
  }

  @Permissions('message:delete')
  @Delete('message/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.delete(id);
  }
}
