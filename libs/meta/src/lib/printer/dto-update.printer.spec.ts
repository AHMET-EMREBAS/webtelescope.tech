import { TestModel } from '../builders';
import { Model } from '../meta';
import { clearSpace } from '../utils';
import { printUpdateDto } from './dto-update.printer';
describe('create dto printer', () => {
  it('should print the create dto', () => {
    const model: Model = TestModel('Test');

    const __expected = `export class UpdateTestDto extends PartialType(CreateTestDto) { }`;

    const __result = printUpdateDto(model);

    expect(clearSpace(__result)).toBe(clearSpace(__expected));
  });
});
