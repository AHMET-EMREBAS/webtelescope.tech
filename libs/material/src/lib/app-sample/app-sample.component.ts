import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutModule } from '../app-layout/app-layout.component';
import { RouterModule } from '@angular/router';
import { NavListComponent } from '../nav-list';

@Component({
  selector: 'wt-app-sample',
  standalone: true,
  imports: [CommonModule, RouterModule, AppLayoutModule, NavListComponent],
  templateUrl: './app-sample.component.html',
  styleUrl: './app-sample.component.scss',
})
export class AppSampleComponent {}
