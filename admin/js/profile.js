import {handleResponseValidation} from "./utils/responseValidation.js";
import {render} from './utils/renderView.js'

const profileTemplate = document.querySelector('#profile-template').innerHTML

function getUsers() {

    async function getUser() {
        return await fetch('/users/me',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    getUser().then((response)=> {
        return handleResponseValidation(response)
    }).then(data => {
        const html = Mustache.render(profileTemplate, {
            name: data.name
        })
        render(html)
    }).catch (e => console.log(e))
}

function activateProfileModule() {
    getUsers();
}

export { activateProfileModule }