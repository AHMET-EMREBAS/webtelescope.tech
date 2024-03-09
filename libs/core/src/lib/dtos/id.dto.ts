import { Dto, NumberProperty } from '../property';

@Dto()
export class IDDto {
  @NumberProperty({ required: true })
  id!: number;
}
