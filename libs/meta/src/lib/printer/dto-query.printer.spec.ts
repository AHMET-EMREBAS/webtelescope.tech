import { Model } from '../meta';
import { clearSpace } from '../utils';
import { printQueryDto } from './dto-query.printer';
import { TestModel } from '../builders';

describe('QueryDto printer', () => {
  it('should print the query dto', () => {
    const model: Model = TestModel('Test');

    const __expected = `
    export class QueryTestDto implements IQueryTestDto { 
        text?:string;
        num?:number;
        bool?:boolean;
        date?:Date;
        categoryName?:string;
    }
    `;

    const __result = printQueryDto(model);

    const expected = clearSpace(__expected);
    const result = clearSpace(__result);

    expect(result).toBe(expected);
  });
});
