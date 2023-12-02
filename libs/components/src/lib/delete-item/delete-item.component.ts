/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResourceService } from '../api';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'wt-delete-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.scss',
})
export class DeleteItemComponent {
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private readonly route: ActivatedRoute,
    @Inject(ResourceService) private readonly service: ResourceService<any>,
    private readonly router: Router
  ) {}

  deleteItem() {
    this.service.delete(this.id);
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
