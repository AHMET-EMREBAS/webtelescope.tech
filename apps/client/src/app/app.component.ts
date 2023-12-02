import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from './category.service';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'wt-root',
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  constructor(private readonly service: CategoryService) {}
  ngAfterViewInit(): void {
    this.service.entityActions$.subscribe(console.log);
    this.service.entities$.subscribe(console.log);
    this.service.add({ name: 'hello' });
  }
}
