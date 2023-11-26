import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateCommentDto } from './create-comment.dto';

@Exclude()
export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
