import { Component } from '@angular/core';
import { NavigationComponent, NavigationModule } from '../navigation';

@Component({
  selector: 'wt-app-layout',
  standalone: true,
  imports: [NavigationModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent extends NavigationComponent {}
