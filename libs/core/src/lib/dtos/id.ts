import { NumberProperty } from '../property';

export class IDDto {
  @NumberProperty({ required: true })
  id!: number;
}
