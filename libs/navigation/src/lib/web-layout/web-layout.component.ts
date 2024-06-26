import { Component } from '@angular/core';
import { NavigationModule } from '../navigation/navigation.module';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'wt-web-layout',
  standalone: true,
  imports: [NavigationModule],
  templateUrl: './web-layout.component.html',
  styleUrl: './web-layout.component.scss',
})
export class WebLayoutComponent extends NavigationComponent {}
