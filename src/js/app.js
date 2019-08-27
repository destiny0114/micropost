import "core-js/stable";
import "regenerator-runtime/runtime";
// if want use async must install core js and regenerator

import { http } from './components/http';
import { ui } from './components/ui';

document.addEventListener('DOMContentLoaded', (e) => {
    getPosts();
});

document.querySelector('.post-submit').addEventListener('click', (e) => {
    e.preventDefault();
    addPost();
});

document.querySelector('#posts').addEventListener('click', (e) => {
    deletePost(e);
});

document.querySelector('#posts').addEventListener('click', (e) => {
    enableEditPost(e);
});

document.querySelector('.card-form').addEventListener('click', (e) => {
    disableEditPost(e);
});

function getPosts() {
    http.get('https://micropost-json-server.herokuapp.com/posts').then(data => { ui.showPosts(data); }
    ).catch(err => console.log(err));
}

function addPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = ui.id;

    const data = {
        title: title,
        body: body
    };

    if (title === '' || body === '') {
        ui.showAlert('Please fill the form', 'alert alert-danger')
    }
    else {
        if (id === '') {
            http.post('https://micropost-json-server.herokuapp.com/posts', data).then(data => {
                ui.showAlert('Post Added', 'alert alert-success')
                ui.clearFields();
                getPosts();
            }).catch(err => console.log(err));
        }
        else {
            http.put(`https://micropost-json-server.herokuapp.com/posts/${id}`, data).then(data => {
                ui.showAlert('Post Updated', 'alert alert-success')
                ui.changeFormState('add');
                getPosts();
            }).catch(err => console.log(err));
        }
    }
}

function deletePost(e) {
    e.preventDefault();

    if (e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;

        if (confirm('Are You Sure?')) {
            http.delete(`https://micropost-json-server.herokuapp.com/posts/${id}`).then(data => {
                ui.showAlert('Post Removed', 'alert alert-success')
                getPosts();
            }).catch(err => console.log(err));
        }
    }
}

function enableEditPost(e) {
    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id: id,
            title: title,
            body: body
        }

        ui.fillForm(data);
    }
    e.preventDefault();
}

function disableEditPost(e) {
    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }
    e.preventDefault();
}