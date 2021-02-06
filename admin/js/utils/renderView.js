const $mainSection = document.querySelector('#main_section')

function render(html) {
    $mainSection.innerHTML = html
}

export {render}