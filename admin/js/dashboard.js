import {activateProfileModule} from "./profile.js";
import {activatePagesModule} from "./pages.js";
import {activateArticlesModule} from "./articles.js";
import {goToLogin} from "./utils/responseValidation.js";

const $menu = document.querySelectorAll('.dash__sidebar a');

function changeModule() {
    switch (window.location.hash) {
        case '#profile':
            activateProfileModule();
            break;
        case '#pages':
            activatePagesModule();
            break;
        case '#articles':
            activateArticlesModule();
            break;
        case '#logout':
            logout();
            break;
    }

    //Set active menu
    const path = window.location.pathname
    const hash = window.location.hash
    $menu.forEach(function(item) {
        const href = item.getAttribute('href')

        path + hash === href ? item.className = 'active' : item.className = ''
    });
}

function logout() {
    fetch('/users/logout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(() => {
        goToLogin();
    }).catch(e => console.log("Can not logout"));
}

window.addEventListener('hashchange', function() {
    changeModule();
}, false);

changeModule()
