import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from '@webpackages/gen-crud';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'wt-sample',
  standalone: true,
  imports: [CommonModule, MatCardModule, CategoryFormComponent],
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss',
})
export class SampleComponent {
  selectedFile!: File;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('api/upload', formData).subscribe(
      (response) => console.log('Upload successful', response),
      (error) => console.log('Error uploading file', error)
    );
  }
}
