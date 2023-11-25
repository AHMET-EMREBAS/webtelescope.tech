import { toPrintable } from './to-printable';
describe('to-printable', () => {
  it('should convert object to printable string', () => {
    expect(toPrintable({ name: 'hello' })).toBe("{name:'hello'}");
    expect(toPrintable({ name: 1 })).toBe('{name:1}');
    expect(toPrintable({ name: 1 })).toBe('{name:1}');
    expect(toPrintable([{ a: 1, b: [1, 2, 3, 4] }])).toBe(
      `[{a:1,b:[1,2,3,4]}]`
    );

    expect(toPrintable(new Date('11/25/2023, 12:25:15 AM'))).toBe(
      "new Date('11/25/2023, 12:25:15 AM')"
    );
  });
});
