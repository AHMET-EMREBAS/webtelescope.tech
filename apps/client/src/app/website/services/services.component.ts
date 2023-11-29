import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'wt-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  entities$: Observable<
    {
      name: string;
      description: string;
      image: string;
      details: string;
      route: string;
    }[]
  > = of([
    {
      name: 'Inventory',
      description: 'Inventory app description',
      details: 'App details',
      image: './assets/icons/icon-72x72.png',
      route: 'inventory',
    },
    {
      name: 'Point Of Sale',
      description: 'Point Of Sale app description',
      details: 'App details',
      image: './assets/icons/icon-72x72.png',
      route: 'pos',
    },
    {
      name: 'Project Management',
      description: 'Project Management app description',
      details: 'App details',
      image: './assets/icons/icon-72x72.png',
      route: 'project-management',
    },
  ]);
}
