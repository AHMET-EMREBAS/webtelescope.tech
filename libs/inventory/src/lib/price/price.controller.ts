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
import { CreatePriceDto, QueryPriceDto, UpdatePriceDto } from './dto';
import { PriceService } from './price.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class PriceController {
  constructor(protected readonly priceService: PriceService) {}

  @Permissions('price:read')
  @Get('prices')
  async findAllPrices(@Query(ValidationPipe) query: QueryPriceDto) {
    return this.priceService.find(query);
  }

  @Permissions('price:read')
  @Get('price/:id')
  findPriceById(@Param('id', ParseIntPipe) id: number) {
    return this.priceService.findOneById(id);
  }
  @Permissions('price:read')
  @Post('price')
  async save(@Body(ValidationPipe) entity: CreatePriceDto) {
    return this.priceService.save(entity);
  }

  @Permissions('price:update')
  @Put('price/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdatePriceDto
  ) {
    return this.priceService.update(id, entity);
  }

  @Permissions('price:delete')
  @Delete('price/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.priceService.delete(id);
  }
}
