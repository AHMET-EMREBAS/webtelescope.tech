import { EntityPrinter } from './entity';

describe('Dto Printer', () => {
  it('should print dto', () => {
    const dto = new EntityPrinter({
      name: 'Some',
      properties: {
        name: {
          type: 'string',
          minLength: 3,
          icon: '10k',
          inputType: 'autocomplete',
          label: '',
          name: 'name',
          unique: true,
          required: true,
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
