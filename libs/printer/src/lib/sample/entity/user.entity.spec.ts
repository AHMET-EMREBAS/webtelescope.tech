import { EntityPrinter } from './user.entity';
describe('UserEntityPrinter', () => {
  it('print', () => {
    const result = EntityPrinter.print();
    console.log(result);
  });
});
