import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


export function RestController() {
  @ApiTags()
  @Controller()
  class __Controller {}

  return __Controller;
}
