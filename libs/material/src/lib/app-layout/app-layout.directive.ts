import { NgTemplateOutlet } from '@angular/common';
import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[wtMainContent]' })
export class MainContentDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtFloatingItems]' })
export class FloatingItemsDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtToolbarRight]' })
export class ToolbarRightDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtToolbarLeft]' })
export class ToolbarLeftDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtSidenavLeft]' })
export class SidenavLeftDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtSidenavRight]' })
export class SidenavRightDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtStatusbarLeft]' })
export class StatusbarLeftDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtStatusbarRightt]' })
export class StatusbarRighttDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}
