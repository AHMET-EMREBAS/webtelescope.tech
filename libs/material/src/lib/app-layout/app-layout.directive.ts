import { NgTemplateOutlet } from '@angular/common';
import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[wtMainContent]', standalone: true })
export class MainContentDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtFloatingItems]', standalone: true })
export class FloatingItemsDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtToolbarRight]', standalone: true })
export class ToolbarRightDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtToolbarLeft]', standalone: true })
export class ToolbarLeftDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtSidenavLeft]', standalone: true })
export class SidenavLeftDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtSidenavRight]', standalone: true })
export class SidenavRightDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtStatusbarLeft]', standalone: true })
export class StatusbarLeftDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtStatusbarRightt]', standalone: true })
export class StatusbarRighttDirective {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}
