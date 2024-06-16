import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class DialogService {
  constructor(
    protected readonly dialog: MatDialog,
    protected readonly snack: MatSnackBar
  ) {}

  confirm(message: string) {
    this.dialog.open(ConfirmComponent, {
      data: { message },
    });
  }
  protected __snack(message: string, panelClass: string) {
    this.snack.open(message, undefined, { panelClass });
  }

  info(message: string) {
    this.__snack(message, 'snackbar-info');
  }
  error(message: string) {
    this.snack.open(message, undefined, {
      duration: 2000,
      panelClass: 'snackbar-error',
    });
  }
  success(message: string) {
    this.snack.open(message, undefined, {
      duration: 2000,
      panelClass: 'snackbar-success',
    });
  }
  warning(message: string) {
    this.snack.open(message, undefined, {
      duration: 2000,
      panelClass: 'snackbar-warning',
    });
  }
}
