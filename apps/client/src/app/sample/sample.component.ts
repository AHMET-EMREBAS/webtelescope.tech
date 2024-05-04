import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FileUploadComponent } from '@webpackages/material/file-upload';
@Component({
  selector: 'wt-sample',
  standalone: true,
  imports: [CommonModule, FileUploadComponent],
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss',
})
export class SampleComponent {
  constructor(private http: HttpClient) {}

  onSelectFile(formData: FormData): void {
    this.http.post('api/upload', formData).subscribe(
      (response) => console.log('Upload successful', response),
      (error) => console.log('Error uploading file', error)
    );
  }

  uplaodFile() {}
}
