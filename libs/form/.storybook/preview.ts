import { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';

setCompodocJson(await import('./documentation.json'));

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        actions: { argTypesRegex: '^.*Event' },
        method: 'alphabetical',
      },
    },
  },
};

export default preview;
