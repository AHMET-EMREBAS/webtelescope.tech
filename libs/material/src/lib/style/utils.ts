const mediaBreakPoints = {
  sm: '(width <= 500px)',

  msm: '(width > 500px)',

  md: '(width > 500px) and (width <= 800px)',

  mmd: '(width > 800px)',

  lmd: '(width <= 500px)',

  lg: '(width > 800px) and (width <= 1400px)',

  mlg: '(width > 1400px)',

  llg: '(width <= 800px)',

  xl: '(width > 1400px)',

  lxl: '(width <= 1400px)',
};

export function insertMediaRules(
  sheet: CSSStyleSheet,
  className: string,
  rule: string
) {
  for (const [mediaClassName, mediaBreakPoint] of Object.entries(
    mediaBreakPoints
  )) {
    sheet.insertRule(`
        @media  ${mediaBreakPoint} { 
            [class~='${mediaClassName}:${className}']{ ${rule} }
        }`);
  }
}

export function insertTransitionRules(
  sheet: CSSStyleSheet,
  className: string,
  propertyNames: string[]
) {
  for (let i = 0; i <= 100; i++) {
    sheet.insertRule(
      `.${className}-${
        i * 400
      }ms { transition:${propertyNames} ease-in-out ${i}ms; }`
    );
  }
}

export function insertActionRules(
  sheet: CSSStyleSheet,
  className: string,
  rule: string
) {
  for (const action of ['hover', 'focus', 'active']) {
    sheet.insertRule(`[class~='${action}:${className}']:${action} { ${rule} }`);
  }
}

export function insertRule(
  sheet: CSSStyleSheet,
  className: string,
  rule: string
) {
  sheet.insertRule(`.${className} { ${rule}}`);
}
