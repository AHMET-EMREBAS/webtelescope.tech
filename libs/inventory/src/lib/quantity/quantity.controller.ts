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
import { CreateQuantityDto, QueryQuantityDto, UpdateQuantityDto } from './dto';
import { QuantityService } from './quantity.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class QuantityController {
  constructor(protected readonly quantityService: QuantityService) {}

  @Permissions('quantity:read')
  @Get('quantitys')
  async findAllQuantitys(@Query(ValidationPipe) query: QueryQuantityDto) {
    return this.quantityService.find(query);
  }

  @Permissions('quantity:read')
  @Get('quantity/:id')
  findQuantityById(@Param('id', ParseIntPipe) id: number) {
    return this.quantityService.findOneById(id);
  }
  @Permissions('quantity:read')
  @Post('quantity')
  async save(@Body(ValidationPipe) entity: CreateQuantityDto) {
    return this.quantityService.save(entity);
  }

  @Permissions('quantity:update')
  @Put('quantity/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateQuantityDto
  ) {
    return this.quantityService.update(id, entity);
  }

  @Permissions('quantity:delete')
  @Delete('quantity/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.quantityService.delete(id);
  }
}
