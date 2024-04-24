import { Controller, Get, Headers } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('hello')
  hello(@Headers('x-orgname') orgname: string) {
    console.log(orgname);
    return 'hello';
  }
}
