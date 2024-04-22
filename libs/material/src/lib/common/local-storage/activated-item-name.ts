import { LocalStoreKeys } from './local-store-keys';

export function setActivatedItemName(title: string) {
  localStorage.setItem(LocalStoreKeys.ACTIVATED_ITEM_NAME, title);
}

export function getActivatedItemName() {
  return localStorage.getItem(LocalStoreKeys.ACTIVATED_ITEM_NAME);
}
