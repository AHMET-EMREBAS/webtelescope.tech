/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputDirective } from './input.directive';

describe('InputDirective', () => {
  it('should create an instance', () => {
    const directive = new InputDirective({
      nativeElement: { attributes: {} },
    } as any);
    expect(directive).toBeTruthy();
  });
});
