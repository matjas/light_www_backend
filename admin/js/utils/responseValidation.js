
const goToDashboard = function() {
    window.location.href = "/admin/dashboard.html#profile"
}

function goToLogin() {
    window.location.href = "/admin/index.html"
}

function typeValidation(response, type) {
    const isValid = true
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes(type)) {
        console.log(`Oops, we haven't got type ${type}`)
        return isValid
    }

    return isValid
}

function handleResponseValidation (response, type = 'application/json') {

    if (response.status === 401) {
        goToLogin()
        throw new Error(response.statusText)
    }

    if (!typeValidation(response, type)) {
        throw new Error(`expected content-type: ${type}`)
    }

    return response.json()
}

export {handleResponseValidation, goToLogin, goToDashboard}