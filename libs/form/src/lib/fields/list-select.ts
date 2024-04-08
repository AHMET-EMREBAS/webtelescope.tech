import { AfterViewInit, Component, Input } from '@angular/core';
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
  selector: 'wt-list-select',
  template: `
    {{ formGroup.get(inputName)?.value | json }}
    <mat-card style="width: 100%;">
      <mat-card-header>
        <mat-card-title>
          <h1>{{ label }}</h1>
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
          <mat-selection-list #input [formControlName]="inputName">
            <div style="display: flex; flex-direction: row; gap: 1em;">
              @for (item of items; track item) {

              <section>
                <h1>{{ item.label }}</h1>
                @if(item.subs) { @for(subItem of item.subs; track subItem){
                <mat-list-option [value]="subItem" checkboxPosition="before">
                  {{ subItem.label }}
                </mat-list-option>

                } } @else {

                <mat-list-option [value]="item" checkboxPosition="before">
                  {{ item.label }}
                </mat-list-option>
                }
              </section>
              }
            </div>
          </mat-selection-list>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class ListSelectComponent
  extends BaseFieldComponent<any, MatSelectionList>
  implements AfterViewInit
{
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
    return this.items.map((e) => e.subs?.length || 1).reduce((p, c) => p + c);
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
}
