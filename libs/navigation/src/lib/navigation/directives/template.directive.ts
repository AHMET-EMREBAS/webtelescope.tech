import { Directive, TemplateRef } from '@angular/core';

/**
 *
 */
@Directive({ selector: '[wtTemplate]' })
export class TemplateDirective<T = unknown> {
  constructor(public readonly templateRef: TemplateRef<T>) {}
}

/**
 * wtFloatingPanel
 */
@Directive({ selector: '[wtFloatingPanel]', standalone: true })
export class FloatingPanelDirective extends TemplateDirective {}
/**
 * wtMainPanel
 */
@Directive({ selector: '[wtMainPanel]', standalone: true })
export class MainPanelDirective extends TemplateDirective {}
/**
 * wtLeftPanel
 */
@Directive({ selector: '[wtLeftPanel]', standalone: true })
export class LeftPanelDirective extends TemplateDirective {}
/**
 * wtRightPanel
 */
@Directive({ selector: '[wtRightPanel]', standalone: true })
export class RightPanelDirective extends TemplateDirective {}
/**
 * wtToolbarLeft
 */
@Directive({ selector: '[wtToolbarLeft]', standalone: true })
export class ToolbarLeftDirective extends TemplateDirective {}
/**
 * wtToolbarRight
 */
@Directive({ selector: '[wtToolbarRight]', standalone: true })
export class ToolbarRightDirective extends TemplateDirective {}
/**
 * wtStatusbarLeft
 */
@Directive({ selector: '[wtStatusbarLeft]', standalone: true })
export class StatusbarLeftDirective extends TemplateDirective {}
/**
 * wtStatusbarRight
 */
@Directive({ selector: '[wtStatusbarRight]', standalone: true })
export class StatusbarRightDirective extends TemplateDirective {}
