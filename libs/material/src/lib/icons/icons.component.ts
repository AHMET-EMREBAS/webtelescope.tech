import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconList } from '../common';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription, debounceTime } from 'rxjs';
@Component({
  selector: 'wt-icons',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    MatRadioModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss',
})
export class IconsComponent implements OnInit, OnDestroy {
  fill = false;
  color = 'primary';
  iconList = IconList;
  search: string = '';
  filteredIcons: string[] = [];

  searchControl = new FormControl('');
  searchControlValueSubscription!: Subscription;
  constructor(private readonly snack: MatSnackBar) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.filteredIcons = this.iconList.filter((e) => {
          return value
            ?.toLowerCase()
            .split(' ')
            .map((v) => e.includes(v))
            .reduce((p, c) => p || c);
        });
      });
  }
  ngOnDestroy(): void {
    this.searchControlValueSubscription.unsubscribe();
  }

  message(value: string) {
    const isFill = this.fill ? 'class="fill"' : '';
    const template = `<mat-icon ${isFill} color="${this.color}" > ${value}</mat-icon> `;
    this.snack.open(`${template} is copied to clipboard`, undefined, {
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  searchIcon(searchText: string) {
    this.filteredIcons = this.iconList.filter((e) =>
      e.includes(searchText.toLowerCase())
    );
  }
}
