import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, CategoryComponent } from '@webpackages/gen-crud';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
@Component({
  selector: 'wt-sample',
  standalone: true,
  imports: [CommonModule, MatCardModule, CategoryComponent],
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss',
})
export class SampleComponent implements AfterViewInit, OnDestroy {
  count$ = this.category.allCount$;
  sub!: Subscription;
  constructor(protected readonly category: CategoryService) {}
  ngAfterViewInit(): void {
    this.sub = this.category.entities$.subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
