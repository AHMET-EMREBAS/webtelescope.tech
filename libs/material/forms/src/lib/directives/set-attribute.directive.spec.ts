/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetAttributeDirective } from './set-attribute.directive';

describe('SetAttributeDirective', () => {
  it('should create an instance', () => {
    const directive = new SetAttributeDirective({
      nativeElement: { attributes: {} },
    } as any);
    expect(directive).toBeTruthy();
  });
});
