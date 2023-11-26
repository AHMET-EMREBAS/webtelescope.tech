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
import { CreateStoreDto, QueryStoreDto, UpdateStoreDto } from './dto';
import { StoreService } from './store.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class StoreController {
  constructor(protected readonly storeService: StoreService) {}

  @Permissions('store:read')
  @Get('stores')
  async findAllStores(@Query(ValidationPipe) query: QueryStoreDto) {
    return this.storeService.find(query);
  }

  @Permissions('store:read')
  @Get('store/:id')
  findStoreById(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.findOneById(id);
  }
  @Permissions('store:read')
  @Post('store')
  async save(@Body(ValidationPipe) entity: CreateStoreDto) {
    return this.storeService.save(entity);
  }

  @Permissions('store:update')
  @Put('store/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateStoreDto
  ) {
    return this.storeService.update(id, entity);
  }

  @Permissions('store:delete')
  @Delete('store/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.delete(id);
  }
}
