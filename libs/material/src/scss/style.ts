
const sheet = document.querySelector('style').sheet;

const colors = {
    primary: 'primary',
    accent: 'accent',
    warn: 'warn',
    error: 'error',
    black: 'black',
    white: 'white'
}

const units = {
    px: 'px',
    em: 'em',
    rem: 'rem',
    per: '%'
}


const sides = {
    r: "right",
    l: "left",
    t: 'top',
    b: 'top'
}

const sizes = {
    m: 'margin',
    p: 'padding',
    h: 'height',
    w: 'width',
    f: 'font-size',
    b: 'border-width',
}




/**
 * 
 * @param {string} rule 
*/
function insertRule(rule) {
    sheet.insertRule(rule);
}


for (let i = 0; i <= 100; i++) {
    for (const u of units) {
        for (const s of sizes) {
        }
    }
}
