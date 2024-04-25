import { TestModel } from '../builders';
import { clearSpace } from '../utils';
import { printEntity } from './entity.printer';
describe('entity printer', () => {
  it('should print the entity', () => {
    const model = TestModel('Test');

    const __expected = `export class Test extends BaseEntity implements ITest {
            text!:string; 
            num?:number; 
            bool?:boolean; 
            date?:Date; 
            list?:string[]; 
            enumValue?:EnumValue; 
            category?:Category[];
    }`;

    const __result = printEntity(model);

    const expected = clearSpace(__expected);

    const result = clearSpace(__result);

    expect(result).toBe(expected);
  });
});
