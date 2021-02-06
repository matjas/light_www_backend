import {handleResponseValidation} from "./utils/responseValidation.js";
import {render} from './utils/renderView.js'

const pagesTemplate = document.querySelector('#pages-template').innerHTML

function getPages() {

    async function getPages() {
        return await fetch('/pages',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    getPages().then((response)=> {
        return handleResponseValidation(response)
    }).then(data => {
        const html = Mustache.render(pagesTemplate, {
            pages: data
        })
        render(html)
        bindEvents();
    }).catch (e => console.log(e))
}

function updatePage(id, data) {
    fetch(`/pages/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(()=>{
        getPages();
    }).catch((e)=> {
        console.error('Can not update page');
    })
}

function addPage(data) {
    fetch(`/pages`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(()=>{
        getPages();
    }).catch((e)=> {
        console.error('Can not add page');
    })
}

function deletePage(id) {
    fetch(`/pages/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(()=>{
        getPages();
    }).catch((e)=> {
        console.error('Can not delete page');
    })
}

function bindEvents() {
    //Elements
    const $table = document.querySelector('table');
    $table.addEventListener('click', (e)=>{
        let $el = e.target;
        let type = $el.dataset.type;
        let id = $el.dataset.id;
        let $row = ($el.parentElement).parentElement;
        let name = ($row.querySelector('.inp-name')).value;
        let code = ($row.querySelector('.inp-code')).value;
        let description = ($row.querySelector('.inp-desc')).value;
        let data = {name, code, description}

        switch (type) {
            case 'save':
                updatePage(id, data)
                break;
            case 'add':
                addPage(data)
                break;
            case 'delete':
                deletePage(id)
                break;
        }
    })
}

function activatePagesModule() {
    getPages();
}

export { activatePagesModule }