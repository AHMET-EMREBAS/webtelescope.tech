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
import { CreateCommentDto, QueryCommentDto, UpdateCommentDto } from './dto';
import { CommentService } from './comment.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class CommentController {
  constructor(protected readonly commentService: CommentService) {}

  @Permissions('comment:read')
  @Get('comments')
  async findAllComments(@Query(ValidationPipe) query: QueryCommentDto) {
    return this.commentService.find(query);
  }

  @Permissions('comment:read')
  @Get('comment/:id')
  findCommentById(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOneById(id);
  }
  @Permissions('comment:read')
  @Post('comment')
  async save(@Body(ValidationPipe) entity: CreateCommentDto) {
    return this.commentService.save(entity);
  }

  @Permissions('comment:update')
  @Put('comment/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateCommentDto
  ) {
    return this.commentService.update(id, entity);
  }

  @Permissions('comment:delete')
  @Delete('comment/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.delete(id);
  }
}
