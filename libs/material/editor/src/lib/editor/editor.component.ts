import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Quill from 'quill';
@Component({
  selector: 'wt-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editor') editor!: ElementRef<HTMLDivElement>;
  ngAfterViewInit(): void {
    new Quill(this.editor.nativeElement, {
      theme: 'snow',
    });
  }
}
