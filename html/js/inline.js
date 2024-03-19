(() => {
    for (const sheet of document.styleSheets) {
        for (const rule of sheet.cssRules) {

            const styleContent = rule
                .cssText
                .split('{')
                .pop()
                .split('}')
                .shift();

            const selectorName = rule
                .cssText
                .split('{')
                .shift()
                .trim();

            try {
                document.querySelectorAll(selectorName)?.forEach(e => {
                    e.classList.remove(selectorName.replace('.', '').trim());
                    const existingStyleContent = e.getAttribute('style') ?? ''
                    const newStyleContent = existingStyleContent + styleContent;
                    e.setAttribute('style', newStyleContent);
                })
            } catch (err) {

            }
        }
    }

})();