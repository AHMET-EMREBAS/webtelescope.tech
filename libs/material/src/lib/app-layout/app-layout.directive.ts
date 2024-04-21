import { NgTemplateOutlet } from '@angular/common';
import { Directive, TemplateRef } from '@angular/core';
import { ITemplateRef } from '../common/types';

@Directive({ selector: '[wtMainContent]', standalone: true })
export class MainContentDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtFloatingItems]', standalone: true })
export class FloatingItemsDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtToolbarRight]', standalone: true })
export class ToolbarRightDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtToolbarLeft]', standalone: true })
export class ToolbarLeftDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtSidenavLeft]', standalone: true })
export class SidenavLeftDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtSidenavRight]', standalone: true })
export class SidenavRightDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtStatusbarLeft]', standalone: true })
export class StatusbarLeftDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtStatusbarRightt]', standalone: true })
export class StatusbarRighttDirective
  implements ITemplateRef<NgTemplateOutlet>
{
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}
