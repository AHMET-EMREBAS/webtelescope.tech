
(() => {
    const body = document.body;
    const scripts = [
        './js/inline.js',
        './js/clipboard.js'
    ]
    for (const j of scripts) {
        const e = document.createElement("script")
        e.setAttribute('src', j);
        body.append(e)
    }
})();