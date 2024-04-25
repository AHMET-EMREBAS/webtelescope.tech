import { TestModel } from '../builders';
import { Model } from '../meta';
import { clearSpace } from '../utils';
import { printCreateDto } from './dto-create.printer';
describe('create dto printer', () => {
  it('should print the create dto', () => {
    const model: Model = TestModel("Test");

    const __expected = `export class CreateTestDto implements ICreateTestDto { 
      text!:string; 
      num?:number; 
      bool?:boolean; 
      date?:Date; 
      list?:string[]; 
      enumValue?:EnumValue; 
      category?:IDDto[];
    }`;

    const __result = printCreateDto(model);

    expect(clearSpace(__result)).toBe(clearSpace(__expected));
  });
});
