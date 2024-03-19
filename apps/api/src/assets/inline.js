
function applyInlineStyleForEntireDocument() {

    for (const sheet of document.styleSheets) {
        for (const rule of sheet.cssRules) {

            const styleContent = rule
                .cssText
                .split('{')
                .pop()
                .split('}')
                .shift();

            const className = rule
                .cssText
                .split('{')
                .shift()
                .trim();


            document.querySelectorAll(className)?.forEach(e => {
                e.classList.remove(className.replace('.', '').trim());
                const existingStyleContent = e.getAttribute('style') ?? ''
                const newStyleContent = existingStyleContent + styleContent;
                e.setAttribute('style', newStyleContent);
            })
        }
    }
}