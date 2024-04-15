import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from '../app-layout/app-layout.component';
import { NavigationModule } from '../navigation/navigation.module';
import { NavListItem } from '../navigation/nav-list/nav-list.component';

@Component({
  selector: 'wt-sample-app-layout',
  standalone: true,
  imports: [CommonModule, NavigationModule, AppLayoutComponent],
  templateUrl: './sample-app-layout.component.html',
  styleUrl: './sample-app-layout.component.scss',
})
export class SampleAppLayoutComponent {
  sampleListItems: NavListItem[] = ' '
    .repeat(4)
    .split('')
    .map((e) => ({
      label: 'Label',
      icon: 'info',
    }));
}
