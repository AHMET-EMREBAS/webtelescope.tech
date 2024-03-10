/* eslint-disable @typescript-eslint/no-explicit-any */
export const ClassNames = {
  // Width & Height
  w: 'width',
  h: 'height',
  //   Padding & Margin
  p: 'padding',
  pr: 'padding-right',
  pl: 'padding-left',
  pt: 'padding-top',
  pb: 'padding-bottom',
  m: 'margin',
  mr: 'margin-right',
  ml: 'margin-left',
  mt: 'margin-top',
  mb: 'margin-bottom',

  //   Position
  pos: 'position',

  //    Flex
  flex: 'flex',
  grow: 'grow',
  row: 'row',
  col: 'column',
  gap: 'gap',
  jc: 'justify-content',
  ji: 'justify-items',
  ai: 'align-items',
  ac: 'align-content',

  //   Text
  tj: 'text-justify',
  ta: 'text-align',
  ti: 'text-indent',

  fs: 'font-size',
  ft: 'font',
  fw: 'font-width',
  ls: 'letter-spacing',
  ff: 'font-family',

  op: 'opacity',
  sd: 'box-shadow',

  ts: 'text-shadow',
  bw: 'border-width',
  bs: 'border-style',
  bc: 'border-color',
  br: 'border-radius',
};

export const Medias = {
  xs: `@media  (width <= 400px)`,
  mxs: `@media  (width > 400px)`,
  sm: `@media  (width > 400px and width <= 500px)`,
  lsm: `@media  (width <= 400px)`,
  msm: `@media  (width > 500px)`,
  md: `@media  (width > 500px and width <= 600px)`,
  lmd: `@media  (width <= 500px)`,
  mmd: `@media  (width > 600px)`,
  lg: `@media  (width > 600px and width <= 1000px)`,
  llg: `@media  (width <= 600px )`,
  mlg: `@media  (width > 1000px )`,
  xl: `@media  (width > 1000px )`,
  lxl: `@media  (width <= 1000px )`,
};

export const Actions = {
  active: ':active',
  hover: ':hover',
  focus: ':focus',
  'first-child': ' > *:first-child ',
  'last-child': ' > *:last-child ',
  child: ' > * ',
};

export function nv(value: string) {
  return value.replace('per', '%');
}

export function parseRuleAttributes(className: string): {
  media?: string;
  action?: string;
  propertyName: string;
  value: string;
  transition: string;
} | null {
  const classList0 = className.split(':');

  if (classList0.length > 1) {
    const psoudo = classList0[0];
    const completeClass = classList0[1];
    const [key, value, transition] = completeClass.split('-');
    const propertyName = (ClassNames as any)[key];
    if ((Medias as any)[psoudo]) {
      return {
        media: (Medias as any)[psoudo],
        propertyName,
        value,
        transition,
      };
    } else if ((Actions as any)[psoudo]) {
      return {
        action: (Actions as any)[psoudo],
        propertyName,
        value,
        transition,
      };
    }

    return null;
  } else {
    const [key, value, transition] = className.split('-');
    const propertyName = (ClassNames as any)[key];
    if (value) {
      return {
        propertyName,
        value,
        transition,
      };
    }
  }

  return null;
}

export function createClassDefination(className: string) {
  const options = parseRuleAttributes(className);
  if (options) {
    const mainContent = `${options.propertyName}:${nv(options.value)};`;
    const transition = options.transition
      ? `transition: ${options.propertyName} ease-in-out ${options.transition};`
      : '';
    const content = mainContent + transition;

    if (options.media) {
      return `${options.media}{ [class~='${className}'] { ${content} } }`;
    } else if (options.action) {
      return ` [class~='${className}'] ${options.action} { ${content} }`;
    } else {
      return ` [class~='${className}'] { ${content} }`;
    }
  }

  return null;
}

export function styleElements() {
  const elements = document.querySelectorAll('.wt');
  const sheet = document.styleSheets.item(0);
  elements.forEach((e) => {
    const classList = e.classList;
    if (classList.contains('wt')) {
      classList.forEach((cls) => {
        const classDefination = createClassDefination(cls);

        if (classDefination) {
          sheet?.insertRule(classDefination);
        }
      });
    }
  });
}
