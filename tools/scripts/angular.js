// # Write your complex script here and run it using `pnpm run script`

const { exec } = require('child_process');

const nameList = [
  'main-panel',
  'right-panel',
  'left-panel',
  'toolbar',
  'toolbar-right',
  'status-bar',
  'status-bar-right',
  'floating',
];

const componentType = 'directive';
const projectName = 'navigation';
const subDirs = ['navigation', 'directives'];

/**
 * @param {string} value
 * @param {string} project
 * @returns
 */
function command(value) {
  return `npx nx g @nx/angular:${componentType} ${[...subDirs, value].join(
    '/'
  )} --project=${projectName}`;
}

for (const name of nameList) {
  exec(command(name));
}
