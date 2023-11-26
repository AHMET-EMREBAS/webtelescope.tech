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
import { CreatePriceLevelDto, QueryPriceLevelDto, UpdatePriceLevelDto } from './dto';
import { PriceLevelService } from './price-level.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class PriceLevelController {
  constructor(protected readonly price-levelService: PriceLevelService) {}

  @Permissions('price-level:read')
  @Get('price-levels')
  async findAllPriceLevels(@Query(ValidationPipe) query: QueryPriceLevelDto) {
    return this.price-levelService.find(query);
  }

  @Permissions('price-level:read')
  @Get('price-level/:id')
  findPriceLevelById(@Param('id', ParseIntPipe) id: number) {
    return this.price-levelService.findOneById(id);
  }
  @Permissions('price-level:read')
  @Post('price-level')
  async save(@Body(ValidationPipe) entity: CreatePriceLevelDto) {
    return this.price-levelService.save(entity);
  }

  @Permissions('price-level:update')
  @Put('price-level/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdatePriceLevelDto
  ) {
    return this.price-levelService.update(id, entity);
  }

  @Permissions('price-level:delete')
  @Delete('price-level/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.price-levelService.delete(id);
  }
}
