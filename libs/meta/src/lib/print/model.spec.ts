import { ClassType } from './__common';
import { ModelPrinter } from './model';
import { Model, RelationType } from '../meta';
import { clearSpace } from '../utils';

describe('ModelPrinter', () => {
  function NewRoleModel(): Model {
    return {
      modelName: 'Role',
      properties: {
        name: { type: 'string' },
      },
    };
  }
  function NewUserModel(): Model {
    return {
      modelName: 'User',
      properties: { username: { type: 'string' } },
      relations: {
        roles: {
          type: RelationType.Many,
          model: NewRoleModel(),
        },
      },
    };
  }

  describe('Print', () => {
    it('should print create dto', () => {
      const printer = new ModelPrinter(ClassType.CreateDto, NewUserModel());
      const result = printer.print();

      const expected = `
      import { IDDto } from '@webpackages/core';
       export class CreateUserDto { 
         username?: string; 
         roles?: IDDto[];
       }
      `;

      expect(clearSpace(result)).toBe(clearSpace(expected));
    });
  });
});
