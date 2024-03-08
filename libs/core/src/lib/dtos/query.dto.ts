import { Dto, NumberProperty } from '../property';

@Dto()
export class QueryDto {
  @NumberProperty()
  take = 20;
  
  @NumberProperty()
  skip = 0;
}
