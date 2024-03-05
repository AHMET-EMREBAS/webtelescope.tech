import { Printer } from './printer';
import { runPrinters } from './run-printers';

describe('Run Printer', () => {
  it('should run list of pritners', () => {
    class A implements Printer {
      print(): string {
        return 'hello';
      }
    }
    expect(runPrinters([new A()])).toBe('hello ');
  });
});
