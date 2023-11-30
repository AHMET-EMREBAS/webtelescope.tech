import { DtoPrinter } from './dto';

describe('Dto Printer', () => {
  it('should print dto', () => {
    const dto = new DtoPrinter('Create', {
      name: 'Some',
      properties: {
        name: {
          type: 'string',
          icon: '10k',
          inputType: 'autocomplete',
          label: '',
          name: 'name',
          target: '',
        },
      },
      relations: {
        category: {
          name: 'category',
          target: 'Category',
          type: 'subs',
        },
      },
    });

    const result = dto.print();

    expect(result).toBe('');
  });
});
