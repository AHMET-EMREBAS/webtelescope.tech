import { AfterViewInit, Component, Input } from '@angular/core';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { IID, IOption } from '@webpackages/model';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
@Component({
  standalone: true,
  imports: [
    CommonFieldModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatTooltipModule,
  ],
  selector: 'wt-list-select-field',
  template: `
    <input type="text" matInput [formControlName]="inputName" hidden />
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
          <div style="display: flex; flex-direction: row; gap: 1em;">
            @for (item of items; track item) {

            <mat-card style="min-width: 200px;">
              <mat-card-header>
                <div
                  style="display: flex; flex-direction: row; justify-content: space-between; width: 100%; align-items: center;"
                >
                  <h3 *ngIf="item.subs">{{ item.label }}</h3>
                  <button
                    #button
                    mat-icon-button
                    matTooltip="Select All"
                    matTooltipPosition="above"
                    color="primary"
                    (click)="selectGroup(button, listRef)"
                  >
                    <mat-icon>
                      {{
                        button.color === 'primary'
                          ? 'select_all'
                          : 'deselect_all'
                      }}
                    </mat-icon>
                  </button>
                </div>
              </mat-card-header>

              <mat-card-content>
                <mat-selection-list #listRef [attr.data-testid]="inputName">
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
                </mat-selection-list>
              </mat-card-content>
            </mat-card>
            }
          </div>
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
export class ListSelectComponent
  extends BaseFieldComponent<IID[], MatSelectionList>
  implements AfterViewInit
{
  @Input() selectedItems?: Pick<IOption, 'id'>[];

  @Input() items!: IOption[];

  ngAfterViewInit(): void {
    this.formGroup.get(this.inputName)?.valueChanges.subscribe(console.log);
  }

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

  selectItem(item: IOption) {
    if (item.subs) {
      item.subs.forEach((e) => this.selectedItems?.push(e));
    } else {
      this.selectedItems?.push(item);
    }
  }

  selectGroup(button: MatButton, list: MatSelectionList) {
    if (button.color === 'primary') {
      list.selectAll();
      button.color = 'accent';
    } else {
      list.deselectAll();
      button.color = 'primary';
    }
  }
}
