/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@angular/core';
import { LocalStoreService } from './local-storage.service';
import { ENTITY_NAME_TOKEN } from '../providers';

@Injectable({ providedIn: 'root', useExisting: true })
export class CanActivateService {
  constructor(
    @Inject(ENTITY_NAME_TOKEN) private readonly entiytName: string,
    private readonly localStoreService: LocalStoreService
  ) {}

  private itemName(name: string) {
    return `CanActivate${this.entiytName}${name}`;
  }

  private get(actionName: string) {
    return this.localStoreService.get(this.itemName(actionName));
  }

  private set(actionName: string) {
    this.localStoreService.set(this.itemName(actionName), true);
  }

  canCreate(value?: boolean) {
    return true;
  }
  
  canUpdate() {
    return this.localStoreService.get(this.itemName('Update'));
  }
  canDelete() {
    return this.localStoreService.get(this.itemName('Delete'));
  }
  canConfig() {
    return this.localStoreService.get(this.itemName('Config'));
  }
  canView() {
    return this.localStoreService.get(this.itemName('View'));
  }
}
