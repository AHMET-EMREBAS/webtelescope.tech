import { sidesMap, unitsMap } from './common';

const marginPaddingMap = {
  m: 'margin',
  p: 'padding',
};

export function marginPaddingStyles(sheet: CSSStyleSheet) {
  for (let value = 0; value <= 100; value++) {
    for (const [unitClassName, unitValue] of Object.entries(unitsMap))
      for (const [className, propertyName] of Object.entries(
        marginPaddingMap
      )) {
        const rule = `.${className}-${value}${unitClassName} { ${propertyName}:${value}${unitValue}; }`;
        sheet.insertRule(rule);

        for (const [sideClassName, sidePropertyName] of Object.entries(
          sidesMap
        )) {
          const rule = `.${className}${sideClassName}-${value}${unitClassName} { ${propertyName}-${sidePropertyName}:${value}${unitValue} }`;
          sheet.insertRule(rule);
        }
      }
  }
}
