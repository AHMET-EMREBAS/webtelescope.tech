import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from './dialog.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  imports: [MatDialogModule, MatSnackBarModule],
  providers: [DialogService],
  exports: [MatDialogModule, MatSnackBarModule],
})
export class DialogModule {}
