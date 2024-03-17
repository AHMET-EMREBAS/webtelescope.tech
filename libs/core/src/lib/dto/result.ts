import { ApiProperty } from '@nestjs/swagger';
import {
  ObjectLiteral,
  UpdateResult as RUpdate,
  DeleteResult as RDelete,
} from 'typeorm';

export class UpdateResult implements RUpdate {
  @ApiProperty({ type: 'number' }) affected?: number | undefined;
  @ApiProperty({ type: 'object' }) generatedMaps!: ObjectLiteral[];
  @ApiProperty({ type: 'object' }) raw: unknown;
}

export class DeleteResult implements RDelete {
  @ApiProperty({ type: 'object' }) raw: unknown;
  @ApiProperty({ type: 'number' }) affected?: number | null | undefined;
}
