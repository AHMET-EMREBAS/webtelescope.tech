
(() => {
    async function copyToClipboard() {
        const content = document.querySelector('.template > *').outerHTML.toString('utf-8');
        const html = new Blob([content], { type: 'text/html' });
        const plain = new Blob([content], { type: 'text/plain' });
        const data = new ClipboardItem({
            'text/html': html,
            'text/plain': plain,
        })

        await navigator.clipboard.write([data])
    }
    const button = document.createElement('button');
    button.innerText = 'Copy To Clipboard';
    button.addEventListener('click', copyToClipboard)
    button.setAttribute('style', `position:fixed; bottom:0px; right:0px; font-size:1em; box-shadow:0px 0px 3px black; padding-left:1em; padding-right:1em`)
    const body = document.querySelector('body')
    body.append(button);
})();