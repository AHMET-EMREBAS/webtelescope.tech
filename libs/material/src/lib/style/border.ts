import { colors, sidesMap, unitsMap } from './common';
import { insertMediaRules, insertRule } from './utils';

export function borderStyles(sheet: CSSStyleSheet) {
  for (const propertyValue of ['dashed', 'dotted', 'solid', 'none']) {
    {
      const className = `b-${propertyValue}`;
      const propertyName = 'border-style';
      const rule = `${propertyName}:${propertyValue}`;

      insertRule(sheet, className, rule);
      insertMediaRules(sheet, className, rule);
    }

    for (const [sideName, sidePropertyName] of Object.entries(sidesMap)) {
      {
        const className = `b${sideName}-${propertyValue}`;
        const propertyName = `border-${sidePropertyName}-style`;
        const rule = `${propertyName}:${propertyValue}`;
        insertRule(sheet, className, rule);
      }
    }
  }

  for (const propertyValue of colors) {
    {
      const className = `b-${propertyValue}`;
      const propertyName = `border-color`;
      const rule = `${propertyName}:${propertyValue};`;
      insertRule(sheet, className, rule);
    }
    for (const [sideClassName, sidePropertyName] of Object.entries(sidesMap)) {
      const className = `b${sideClassName}-${propertyValue}`;
      const propertyName = `border-${sidePropertyName}-color`;
      const rule = `${propertyName}:${propertyValue};`;

      insertRule(sheet, className, rule);
    }
  }

  //   Border width
  for (let propertyValue = 0; propertyValue <= 100; propertyValue++) {
    for (const [unitClassName, unitValue] of Object.entries(unitsMap)) {
      {
        const className = `b-${propertyValue}${unitClassName}`;
        const propertyName = `border-width`;
        const rule = `${propertyName}:${propertyValue}${unitValue};`;

        insertRule(sheet, className, rule);
      }

      for (const [sideClassName, sidePropertyName] of Object.entries(
        sidesMap
      )) {
        sheet.insertRule(
          `.b${sideClassName}-${propertyValue}${unitClassName} { border-${sidePropertyName}-width:${propertyValue}${unitValue}`
        );
      }
    }
  }

  //   border radius
  for (let i = 0; i <= 100; i++) {
    for (const [unitClassName, unitValue] of Object.entries(unitsMap)) {
      sheet.insertRule(
        `.brad-${i}${unitClassName} { border-radius:${i}${unitValue}; }`
      );

      for (const [a, b] of Object.entries({ t: 'top', b: 'b' })) {
        for (const [c, d] of Object.entries({ r: 'right', l: 'left' })) {
          sheet.insertRule(
            `.brad-${a}${c}-${i}${unitClassName} { border-${b}-${d}-radius:${i}${unitValue}; }`
          );
        }
      }
    }
  }
}
