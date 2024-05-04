import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Post } from '@webpackages/core';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return value.size < oneKb;
  }
}
@Controller()
export class AppController {
  @Post({
    path: 'upload',
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
