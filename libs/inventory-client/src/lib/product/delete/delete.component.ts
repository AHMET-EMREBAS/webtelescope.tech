import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteItemComponent } from '@webpackages/components';

@Component({
  selector: 'wt-delete',
  standalone: true,
  imports: [CommonModule, DeleteItemComponent],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class DeleteComponent {}
