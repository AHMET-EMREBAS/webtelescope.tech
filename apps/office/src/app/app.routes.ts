import { Route } from '@angular/router';
import { StickyNoteComponent } from './sticky-note/sticky-note.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';

export const APP_ROUTES: Route[] = [
  { path: '', loadComponent: () => StickyNoteComponent },
  { path: 'drag-drop', loadComponent: () => DragDropComponent },
];
