import { AnimationTriggerMetadata } from '@angular/animations';

import {
  bounceInDownOnEnterAnimation,
  bounceOutUpOnLeaveAnimation,
} from 'angular-animations';

export const ErrorAnimations: AnimationTriggerMetadata[] = [
  bounceInDownOnEnterAnimation({ anchor: 'enter' }),
  bounceOutUpOnLeaveAnimation({ anchor: 'leave' }),
];
