/* eslint-disable @typescript-eslint/no-explicit-any */
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonInputComponent } from '../common-input.component';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'wt-chiplist',
  templateUrl: 'chiplist.component.html',
  styleUrls: ['chiplist.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class ChiplistComponent
  extends CommonInputComponent
  implements OnInit, OnDestroy
{
  separatorKeysCodes: number[] = [];
  chipInputControl = new FormControl('');

  chipInputChangeSubscription!: Subscription;

  selectedItems: any[] = [];

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  ngOnInit(): void {
    this.autocompleteOptions$ = this.autocompleteService?.entities$;

    this.chipInputChangeSubscription =
      this.chipInputControl.valueChanges.subscribe((value) => {
        this.autocompleteService?.search(value!);
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.selectedItems.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.chipInputControl.setValue(null);
  }

  remove(itemId: string): void {
    const index = this.selectedItems.findIndex((e) => e.id == itemId);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
      this.announcer.announce(`Removed ${itemId}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedItems.push(event.option.value);
    this.inputRef.nativeElement.value = '';
    this.chipInputControl.setValue(null);
    const control = this.control();
    control?.setValue(this.selectedItems);
  }

  ngOnDestroy(): void {
    this.chipInputChangeSubscription.unsubscribe();
  }
}
