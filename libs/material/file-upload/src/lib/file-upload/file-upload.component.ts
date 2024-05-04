/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MIMEType } from './file-types';

@Component({
  selector: 'wt-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  selectedFile!: File;
  fileName!: string;
  @Input() label = 'Upload File';
  @Input() icon = 'upload';
  @Input() allowedFileTypes: MIMEType[] = [
    'image/png',
    'image/gif',
    'image/jpeg',
    'image/jpg',
  ];
  @Input() maxSize: number = 5;
  @Output() selectEvent = new EventEmitter<FormData>();

  errorMessage = '';

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (
      !this.allowedFileTypes.find(
        (e) => e === (this.selectedFile.type as MIMEType)
      )
    ) {
      this.errorMessage = `File must be one of ${this.allowedFileTypes}! But found ${this.selectedFile.type}!`;
      return;
    }

    if (this.maxSize < this.selectedFile.size) {
      this.errorMessage = `File must be less than ${this.maxSize}KB`;
    }

    this.fileName = this.selectedFile?.name;
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.selectEvent.emit(formData);
  }

  fileSize() {
    if (this.selectedFile) {
      return (this.selectedFile.size / 1024).toFixed(2) + 'KB';
    }
    return '0KB';
  }
}
