class LocalStoreKeyGenerator {
  private static readonly keys = new Set<string>();

  static create(key: string) {
    if (this.keys.has(key)) {
      throw new Error(`${key} already exist in local store`);
    }
    this.keys.add(key);
    return key;
  }
}

export type LocalStore = [() => string | null, (value: string) => void];

/**
 * Create a localstore getter and setter function by local store property key.
 * @param key
 * @returns
 */
export function createLocalStore(key: string): LocalStore {
  LocalStoreKeyGenerator.create(key);
  return [
    () => localStorage.getItem(key),
    (value: string) => localStorage.setItem(key, value),
  ];
}
