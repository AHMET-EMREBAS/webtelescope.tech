import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceService, TableComponent } from '@webpackages/components';
import { CategoryService } from '../category.service';
@Component({
  selector: 'wt-view',
  standalone: true,
  imports: [CommonModule, TableComponent],
  providers: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {}
