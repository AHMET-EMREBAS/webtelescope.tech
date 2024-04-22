import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'wt-sticky-note',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './sticky-note.component.html',
  styleUrl: './sticky-note.component.scss',
})
export class StickyNoteComponent {}
