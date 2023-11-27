/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { TableComponent } from './table.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {
  LocalStoreService,
  ResourceService,
  provideAppName,
  provideEntityName,
  provideModuleName,
  provideSearchControl,
  provideTableColumns,
} from '../api';
import { of } from 'rxjs';

class MockTableService {
  entityName = 'Entity';
  filteredEntities$ = of([
    { id: 1, name: 'Name', description: 'Description' },
    { id: 2, name: 'Name 2', description: 'Description' },
    { id: 3, name: 'Name 3', description: 'Description' },
    { id: 4, name: 'Name 4', description: 'Description' },
    { id: 5, name: 'Name 5', description: 'Description' },
    { id: 5, name: 'Name 5', description: 'Description' },
  ]);

  queryItem(query: any) {
    return;
  }

  getAll() {}
}

const meta: Meta<TableComponent> = {
  component: TableComponent,
  title: 'TableComponent',
  decorators: [
    applicationConfig({ providers: [provideAnimations()] }),
    moduleMetadata({
      providers: [
        provideTableColumns([
          { name: 'name', label: 'Name' },
          { name: 'description', label: 'Description' },
        ]),
        provideSearchControl(),
        LocalStoreService,
        {
          provide: ResourceService,
          useClass: MockTableService,
        },
        provideEntityName('Entity'),
        provideAppName('AppName'),
        provideModuleName('ModuleName'),
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<TableComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/table works!/gi)).toBeTruthy();
  },
};
