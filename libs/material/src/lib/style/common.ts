export const propertyNameMap: Record<string, string> = {
  // Margin Padding
  m: 'margin',
  ml: 'margin-left',
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',

  p: 'padding',
  pl: 'padding-left',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',

  c: 'color',
  bg: 'background-color',

  // Border
  bw: 'border-width',
  blw: 'border-left-width',
  brw: 'border-top-width',
  btw: 'border-right-width',
  bbw: 'border-bottom-width',

  bs: 'border-style',
  bls: 'border-left-style',
  bts: 'border-top-style',
  brs: 'border-right-style',
  bbs: 'border-bottom-style',

  bc: 'border-color',
  blc: 'border-left-color',
  btc: 'border-top-color',
  brc: 'border-right-color',
  bbc: 'border-bottom-color',

  // Border Radius
  br: 'border-radius',
  btlr: 'border-top-left-radius',
  btrr: 'border-top-right-radius',
  bblr: 'border-bottom-left-radius',
  bbrr: 'border-bottom-right-radius',

  w: 'width',
  h: 'height',

  // Font
  fts: 'font-size',
  ftw: 'font-width',
  ls: 'letter-spacing',
  ftf: 'font-family',

  // Flex
  d: 'display',
  fw: 'flex-wrap',
  fg: 'flex-grow',
  fd: 'flex-direction',
  jc: 'justify-content',
  ji: 'justify-items',
  ai: 'align-items',
  ac: 'align-content',
  as: 'align-self',
  js: 'justify-self',
  gap: 'gap',

  // Transform
  t: 'transform',
};

export const mediaBreakPoints: Record<string, string> = {
  xs: ' (width <= 400px) ',
  mxs: ' (width > 400px) ',

  sm: ' (width > 400px) and (width <= 500px) ',
  msm: ' (width > 500px) ',
  lsm: ' (width <= 400px) ',

  md: ' (width > 500px) and (width <= 800px) ',
  mmd: ' (width > 800px) ',
  lmd: ' (width <= 500px) ',

  lg: ' (width > 800px) and (width <= 1400px) ',
  mlg: ' (width > 1400px) ',
  llg: ' (width <= 800px) ',

  xl: ' (width > 1400px) ',
  lxl: ' (width <= 1400px) ',
  print: ' print ',
};

export const actionPseudoMap: Record<string, string> = {
  hover: ':hover',
  focus: ':focus',
  active: ':active',
  visited: ':visited',
  modal: ':modal',
  fullscreen: ':fullscreen',
  'first-letter': ':first-letter',
  selection: '::selection',
};

export const childPseudoMap: Record<string, string> = {
  child: ' > * ',
  'first-child': ' > *:first-child',
  'last-child': ' > *:last-child',
};
