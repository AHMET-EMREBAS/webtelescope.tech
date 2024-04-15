import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from '../app-layout/app-layout.component';
import { NavigationModule } from '../navigation/navigation.module';

@Component({
  selector: 'wt-sample-app-layout',
  standalone: true,
  imports: [CommonModule, NavigationModule, AppLayoutComponent],
  templateUrl: './sample-app-layout.component.html',
  styleUrl: './sample-app-layout.component.scss',
})
export class SampleAppLayoutComponent {}
