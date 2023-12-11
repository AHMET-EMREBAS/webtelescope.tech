import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '@webpackages/material';

@Component({
  selector: 'wt-view',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {}
