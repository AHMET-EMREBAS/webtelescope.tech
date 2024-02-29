import {
  actionPseudoMap as actionPseudoSelectors,
  childPseudoMap as childPseudoSelectors,
  mediaBreakPoints as mediaBreakpoints,
  propertyNameMap,
} from './common';
/**
 * If the className contains a pesudo selector, then return the pesudo selector, else return empty string
 * @param className complete class name
 * @returns the pesudo value
 */
export function getPseudoSelector(className: string): string {
  const [first, ...rest] = className.split(':');
  return rest?.length > 0 ? first : '';
}

/**
 * If the className contains media rule, then return the media breakpoint value, else empty string
 * @param className
 * @returns the media breakpoint value
 */
export function getMediaBreakpoint(className: string): string {
  return mediaBreakpoints[getPseudoSelector(className)] || '';
}

/**
 * If the classname contains action rule (hover, active, focus, selection), then return the action rule, else empty string
 * @param className
 * @returns the action pesudo value
 */
export function getActionPseudoSelector(className: string): string {
  return actionPseudoSelectors[getPseudoSelector(className)] || '';
}

/**
 * If the classname contains child rule (child, first-child, last-child, nth-child), then return the child rule, else empty string
 * @param className
 * @returns the child pesudo value
 */
export function getChildPseudoSelector(className: string): string {
  return childPseudoSelectors[getPseudoSelector(className)] || '';
}

/**
 * If the classname contains transitoin value, then return the transition value, else empty string
 * @param className
 * @returns
 */
export function getTransitionValue(className: string): string {
  const lastValue = className.split('-').pop();
  return lastValue?.endsWith('ms') ? lastValue : '';
}

/**
 * Get the property value
 * @param className
 * @returns
 */
export function getPropertyValue(className: string): string {
  const [prefix, ...preValue] = className.split(':').pop()!.split('-');

  // If there is a transition value, then remove it from the list
  if (getTransitionValue(className)) preValue.pop();

  if (preValue.length > 0) return preValue.join('-');

  return prefix;
}

export function getPropertyName(className: string): string {
  const [prefix, ...preValue] = className.split(':').pop()!.split('-');
  return propertyNameMap[prefix];
}

/**
 * Convert the property value to valid css value
 * @param propertyValue
 * @returns
 */
export function normalizePropertyValue(propertyValue: string) {
  return propertyValue.replace('per', '%');
}

export function convertClassDeclerationToCssRule(className: string): string {
  const propertyName = getPropertyName(className);
  const propertyValue = normalizePropertyValue(getPropertyValue(className));

  const transitionValue = getTransitionValue(className);
  const mediaBreakpoint = getMediaBreakpoint(className);
  const actionPseudo = getActionPseudoSelector(className);
  const childPseudo = getChildPseudoSelector(className);

  const transitionRule = transitionValue
    ? `transition: ${propertyName} ease-in-out ${transitionValue};`
    : '';

  const cssRule = `${propertyName}:${propertyValue.split('|').join(' ')}; ${transitionRule};`;

  const cssClass = `
  [class~='${className}']${childPseudo || actionPseudo || ''} {
     ${cssRule} 
  }`;

  if (mediaBreakpoint) {
    return `@media ${mediaBreakpoint} { ${cssClass} }`;
  }

  return cssClass;
}

export function styleDocument() {
  const sheet = document.querySelector('style')?.sheet;
  const elements = document.querySelectorAll('*');
  elements.forEach((e) => {
    e.classList.forEach((c) => {
      const cssRule = convertClassDeclerationToCssRule(c);
      sheet?.insertRule(cssRule);
    });
  });
}
