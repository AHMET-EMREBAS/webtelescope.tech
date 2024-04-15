import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  notify(title: string, options: NotificationOptions) {
    new Notification(title, options);
  }
}
