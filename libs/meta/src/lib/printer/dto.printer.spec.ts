import { TestModel } from '../builders';
import { clearSpace } from '../utils';
import { printDto } from './dto.printer';
describe('entity printer', () => {
  it('should print the entity', () => {
    const model = TestModel('Test');


    const __expected = `export class CreateTestDto implements ICreateTestDto {
            text?:string; 
            num?:number; 
            bool?:boolean; 
            date?:Date; 
            list?:string[]; 
            enumValue?:EnumValue; 
            category?:IDDto[];
    }`;

    const __result = printDto(model);

    const expected = clearSpace(__expected);

    const result = clearSpace(__result);

    expect(result).toBe(expected);
  });
});
