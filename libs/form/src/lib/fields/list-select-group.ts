import { Component, Input } from '@angular/core';
import { BaseFieldComponent, CommonFieldModule } from './field';
import { ListSelectComponent } from './list-select';
import { IOption } from '@webpackages/model';

@Component({
  selector: 'wt-list-select-group',
  standalone: true,
  imports: [CommonFieldModule, ListSelectComponent],
  template: `
    <form
      [formControlName]="inputName"
      style="display: flex; flex-direction: row; gap: 1em; flex-wrap: wrap; justify-content: space-between;"
    >
      @for(item of items; track item;){

      <wt-list-select
        [inputName]="item.id + ''"
        [label]="item.label"
        [items]="item.subs || []"
      ></wt-list-select>
      }
    </form>
  `,
})
export class ListSelectGroupComponent extends BaseFieldComponent {
  @Input() items!: IOption[];
}
