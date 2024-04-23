import { Autocomplete, Autocompletes } from './autocomplete';

describe('Autocomplete', () => {
  it('should create the autocomplete list', () => {
    const first: Autocomplete = 'additional-name';
    const last: Autocomplete = 'work';
    const list = [...Autocompletes];

    expect(list.shift()).toBe(first);
    expect(list.pop()).toBe(last);
    expect(list.length > 20);
  });
});
