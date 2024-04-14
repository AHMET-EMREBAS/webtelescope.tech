import { Component, Input } from '@angular/core';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { IOption } from '@webpackages/model';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [CommonFieldModule, MatListModule, MatCheckboxModule, MatCardModule],
  selector: 'wt-list-select-field',
  template: `
    <mat-card style="width: 100%;">
      <mat-card-header>
        <mat-card-title>
          <h2>{{ label }}</h2>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-checkbox
          #selectAll
          (change)="toggleSelectAll($event)"
          [checked]="allSelected()"
          [indeterminate]="someSelect()"
        >
          {{ selectAll.checked ? 'Deselect All' : 'Select All' }}
        </mat-checkbox>

        <div [formGroup]="formGroup">
          <mat-selection-list
            #input
            [formControlName]="inputName"
            [attr.data-testid]="inputName"
          >
            <div style="display: flex; flex-direction: row; gap: 1em;">
              @for (item of items; track item) {
              <section>
                <h1 *ngIf="item.subs">{{ item.label }}</h1>
                @if(item.subs) { @for(subItem of item.subs; track subItem){
                <mat-list-option
                  [value]="subItem"
                  checkboxPosition="before"
                  [attr.data-testid]="subItem.label + item.label"
                  [selected]="isSelected(subItem)"
                >
                  <span>{{ subItem.label }}</span>
                </mat-list-option>

                } } @else {

                <mat-list-option
                  [value]="item"
                  checkboxPosition="before"
                  [attr.data-testid]="item.label"
                  [selected]="isSelected(item)"
                >
                  <span> {{ item.label }} </span>
                </mat-list-option>
                }
              </section>
              }
            </div>
          </mat-selection-list>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button
          matTextSuffix
          mat-raised-button
          color="primary"
          (click)="updateField()"
          *ngIf="isUpdateField"
        >
          <mat-icon matIconPrefix>update</mat-icon>
          <span> Update </span>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ListSelectComponent extends BaseFieldComponent<
  IOption[],
  MatSelectionList
> {
  @Input() selectedItems?: Pick<IOption, 'id'>[];

  @Input() items!: IOption[];

  toggleSelectAll(event: MatCheckboxChange) {
    if (event.checked) {
      this.inputRef.selectAll();
    } else {
      this.inputRef.deselectAll();
    }
  }

  getValues() {
    return this.inputRef?.selectedOptions?.selected?.map((e) => e.value) || [];
  }

  itemsLength() {
    return (
      this.items?.map((e) => e.subs?.length || 1).reduce((p, c) => p + c) || 0
    );
  }

  valuesLength() {
    return this.getValues().length;
  }

  someSelect() {
    const selectedLength = this.valuesLength();

    if (selectedLength > 0) {
      return this.itemsLength() > this.valuesLength();
    }
    return false;
  }

  allSelected() {
    return this.itemsLength() == this.valuesLength();
  }

  isSelected(item: IOption) {
    return this.selectedItems?.find((e) => item.id == e.id) ? true : false;
  }
}
