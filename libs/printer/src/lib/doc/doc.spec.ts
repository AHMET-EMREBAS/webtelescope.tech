import { DocPritner } from './doc';
describe('Description', () => {
  it('should print multiline doc', () => {
    const expected = `/**\n * Some\n */\n`;
    const result = new DocPritner({ content: 'Some' }).print();
    expect(result).toBe(expected);
  });

  it('should print multiline doc doc', () => {
    const expected = `/**\n * Some\n */\n`;
    const result = new DocPritner({ content: 'Some' }).print();
    expect(result).toBe(expected);
  });
});
