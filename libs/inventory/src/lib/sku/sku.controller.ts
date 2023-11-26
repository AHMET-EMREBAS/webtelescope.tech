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
import { CreateSkuDto, QuerySkuDto, UpdateSkuDto } from './dto';
import { SkuService } from './sku.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class SkuController {
  constructor(protected readonly skuService: SkuService) {}

  @Permissions('sku:read')
  @Get('skus')
  async findAllSkus(@Query(ValidationPipe) query: QuerySkuDto) {
    return this.skuService.find(query);
  }

  @Permissions('sku:read')
  @Get('sku/:id')
  findSkuById(@Param('id', ParseIntPipe) id: number) {
    return this.skuService.findOneById(id);
  }
  @Permissions('sku:read')
  @Post('sku')
  async save(@Body(ValidationPipe) entity: CreateSkuDto) {
    return this.skuService.save(entity);
  }

  @Permissions('sku:update')
  @Put('sku/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateSkuDto
  ) {
    return this.skuService.update(id, entity);
  }

  @Permissions('sku:delete')
  @Delete('sku/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.skuService.delete(id);
  }
}
