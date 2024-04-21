import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenDirective } from './fullscreen.directive';

@Component({
  selector: 'wt-fullscreen',
  standalone: true,
  imports: [CommonModule, FullscreenDirective],
  templateUrl: './fullscreen.component.html',
  styleUrl: './fullscreen.component.scss',
})
export class FullscreenComponent {}
