import { Component } from '@angular/core';
import { NavigationModule } from '../navigation/navigation.module';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'wt-app-layout',
  standalone: true,
  imports: [NavigationModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent extends NavigationComponent {}
