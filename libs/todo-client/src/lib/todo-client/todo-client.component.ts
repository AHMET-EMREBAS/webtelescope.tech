import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'webpackages-todo-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-client.component.html',
  styleUrl: './todo-client.component.css',
})
export class TodoClientComponent {}
