import { InputType, InputTypes } from './input-type';
import "jest-preset-angular"
describe('InputType', () => {
  it('should create the input type list', () => {
    const first: InputType = 'checkbox';
    const last: InputType = 'week';
    const list = [...InputTypes];
    expect(list.shift()).toBe(first);
    expect(list.pop()).toBe(last);
  });
});
