import { Icon, Icons } from './icons';
describe('Icon', () => {
  it('should contain all the icons', () => {
    const first: Icon = '10k';
    const last: Icon = 'zoom_out_map';

    const list = [...Icons];

    expect(first).toBe(first);
    expect(list.shift()).toBe(first);
    expect(list.pop()).toBe(last);
    expect(list.length > 2000).toBeTruthy();
  });
});
