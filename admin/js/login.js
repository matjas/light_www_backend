import {goToDashboard} from "./utils/responseValidation.js";

//Elements
const $loginForm = document.querySelector('#login-form')
const $loginFormButton = $loginForm.querySelector('button')
const $loginFormPasswordInput = $loginForm.querySelector('input[name="password"]')
const $loginFormNameInput = $loginForm.querySelector('input[name="username"]')
const $loginValidationMessage = document.querySelector('.login_message')

// if(isAuthenticated())
//     window.location.href = "/admin/dashboard"

async function handleSubmit(e) {
    const name = e.target.elements.username.value
    const password = e.target.elements.password.value

    return await fetch('/users/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name, password: password}),
    })
}

function unlockLoginForm() {
    $loginFormButton.removeAttribute('disabled')
    $loginFormPasswordInput.value = ''
    $loginFormNameInput.value = ''
    $loginFormNameInput.focus()
}

$loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    $loginFormButton.setAttribute('disabled', 'disabled')

    handleSubmit(e).then((response)=> {
        if (response.status !== 200) {
            throw new Error(response.statusText)
        }

        return response.json()

    }).then(data => {
        goToDashboard()
        $loginValidationMessage.style.visibility = "hidden";
    }).catch (error => {
        $loginValidationMessage.style.visibility = "visible";

    })

    unlockLoginForm()
})