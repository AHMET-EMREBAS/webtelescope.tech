import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateStoreDto } from './create-store.dto';

@Exclude()
export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
