/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelcasePipe } from '@webpackages/material/forms';
import { BaseTableComponent } from '@webpackages/client-common';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'wt-table',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    LabelcasePipe,
    MatMenuModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T = any>
  extends BaseTableComponent<T>
  implements AfterViewInit {}
