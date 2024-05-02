import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@webpackages/material/services';

@Component({
  selector: 'wt-sample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss',
})
export class SampleComponent implements AfterViewInit {
  constructor(protected readonly category: CategoryService) {}
  ngAfterViewInit(): void {
    this.category.entities$.subscribe(console.log);

    console.log('IS working? ');
    this.category.add({ id: 1, name: 'New Category  1' });
  }
}
