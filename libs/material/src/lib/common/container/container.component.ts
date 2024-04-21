import {
  Component,
  ContentChildren,
  Directive,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TemplateOutletComponent } from '../template-outlet/template-outlet.component';
import { ITemplateRef } from '../types';

export type ContainerType =
  | 'row'
  | 'column'
  | 'right'
  | 'left'
  | 'top'
  | 'bottom';

export type Direction = 'row' | 'column';
export type JustifyContent =
  | 'baseline'
  | 'center'
  | 'end'
  | 'flex-end'
  | 'flex-start'
  | 'left'
  | 'right'
  | 'safe'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | 'start'
  | 'stretch'
  | '';

type AlignItems =
  | 'baseline'
  | 'center'
  | 'end'
  | 'flex-end'
  | 'flex-start'
  | 'start'
  | 'stretch'
  | '';

export type Gap =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '';

@Directive({ selector: '[wtContainerContent]', standalone: true })
export class ContainerContentDirective
  implements ITemplateRef<NgTemplateOutlet>
{
  constructor(
    public readonly templateRef: TemplateRef<NgTemplateOutlet<unknown>>
  ) {}
}

@Component({
  selector: 'wt-container',
  standalone: true,
  imports: [CommonModule, TemplateOutletComponent, ContainerComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  @Input() containerType: ContainerType = 'row';

  @ContentChildren(ContainerContentDirective)
  items?: QueryList<ContainerContentDirective>;

  @Input() flexDirection?: Direction;
  @Input() justifyContent?: JustifyContent;
  @Input() alignItems?: AlignItems;
  @Input() alignContent?: AlignItems;
  @Input() gap?: Gap;
  @Input() wrap?: 'wrap' | 'wrap-reverse' = 'wrap';

  @Input() isScrollable = false;
}
