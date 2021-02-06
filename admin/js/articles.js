import {handleResponseValidation} from "./utils/responseValidation.js";
import {render} from './utils/renderView.js'

const articlesTemplate = document.querySelector('#articles-template').innerHTML

function getArticles() {

    async function getArticles() {
        return await fetch('/articles',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    getArticles().then((response)=> {
        return handleResponseValidation(response)
    }).then(data => {
        const html = Mustache.render(articlesTemplate, {
            articles: data
        })
        render(html)
        bindEvents();
    }).catch (e => console.log(e))
}

function updateArticle(id, data) {
    fetch(`/articles/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(()=>{
        getArticles();
    }).catch((e)=> {
        console.error('Can not update article');
    })
}

function addArticle(data) {
    fetch(`/articles`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(()=>{
        getArticles();
    }).catch((e)=> {
        console.error('Can not add article');
    })
}

function deleteArticle(id) {
    fetch(`/articles/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(()=>{
        getArticles();
    }).catch((e)=> {
        console.error('Can not delete article');
    })
}

function bindEvents() {
    //Elements
    const $table = document.querySelector('table');
    $table.addEventListener('click', (e)=>{
        let $el = e.target;
        let actionType = $el.dataset.type;
        let id = $el.dataset.id;
        let $row = ($el.parentElement).parentElement;
        let name = ($row.querySelector('.inp-name')).value;
        let code = ($row.querySelector('.inp-code')).value;
        let title = ($row.querySelector('.inp-title')).value;
        let description = ($row.querySelector('.inp-desc')).value;
        let data = {name, code, description, title}

        switch (actionType) {
            case 'save':
                updateArticle(id, data)
                break;
            case 'add':
                addArticle(data)
                break;
            case 'delete':
                deleteArticle(id)
                break;
        }
    })
}

function activateArticlesModule() {
    getArticles();
}

export { activateArticlesModule }