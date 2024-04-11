export function mode() {
  return process.env['NODE_ENV'];
}

export function isTesting() {
  return mode() === 'test';
}

export function isDevelopment() {
  return mode() === 'development' || isTesting();
}
