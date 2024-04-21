import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChildren,
  Directive,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { ITemplateRef } from '../types';

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

@Directive({ selector: '[wtStatusbarRight]', standalone: true })
export class StatusbarRightDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtFooterRight]', standalone: true })
export class FooterRightDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtFooterLeft]', standalone: true })
export class FooterLeftDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtContentLeft]', standalone: true })
export class ContentLeftDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Directive({ selector: '[wtContentRight]', standalone: true })
export class ContentRightDirective implements ITemplateRef<NgTemplateOutlet> {
  constructor(public readonly templateRef: TemplateRef<NgTemplateOutlet>) {}
}

@Component({ template: '' })
export class BaseLayoutComponent {
  @ContentChildren(MainContentDirective)
  mainContent?: QueryList<MainContentDirective>;

  @ContentChildren(FloatingItemsDirective)
  floatingItems?: QueryList<FloatingItemsDirective>;

  @ContentChildren(ToolbarRightDirective)
  toolbarRight?: QueryList<ToolbarRightDirective>;

  @ContentChildren(ToolbarLeftDirective)
  toolbarLeft?: QueryList<ToolbarLeftDirective>;

  @ContentChildren(SidenavLeftDirective)
  sidenavLeft?: QueryList<SidenavLeftDirective>;

  @ContentChildren(SidenavRightDirective)
  sidenavRight?: QueryList<SidenavRightDirective>;

  @ContentChildren(StatusbarLeftDirective)
  statusbarLeft?: QueryList<StatusbarLeftDirective>;

  @ContentChildren(StatusbarRightDirective)
  statusbarRight?: QueryList<StatusbarRightDirective>;

  @ContentChildren(FooterRightDirective)
  footerRight?: QueryList<FooterRightDirective>;

  @ContentChildren(FooterLeftDirective)
  footerLeft?: QueryList<FooterLeftDirective>;

  @ContentChildren(ContentLeftDirective)
  contentLeft?: QueryList<ContentLeftDirective>;

  @ContentChildren(ContentRightDirective)
  contentRight?: QueryList<ContentRightDirective>;
}
