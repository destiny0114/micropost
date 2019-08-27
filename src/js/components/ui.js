class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.id = '';
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts) {
        let output = '';

        posts.forEach(post => {
            output += `<div class='card mb-3'>
            <div class='card-body'>
            <h4 class='post-title'>${post.title}</h4>
            <p class='post-text'>${post.body}</p>

            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fas fa-pencil-alt"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fas fa-times"></i>
            </a>
            </div>
            </div>`
        });

        this.post.innerHTML = output;
    }

    showAlert(msg, classname) {
        this.clearAlert();

        const div = document.createElement('div');
        div.className = classname;

        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector('.postsContainer');
        const posts = document.querySelector('#posts');

        container.insertBefore(div, posts);

        setTimeout(() => {
            this.clearAlert();
        }, 3000);

    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.id = parseInt(data.id);

        this.changeFormState('edit');
    }

    changeFormState(state) {
        if (state === 'edit') {
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';

            const btn = document.createElement('button');
            btn.className = 'post-cancel btn btn-light btn-block';
            btn.appendChild(document.createTextNode('Cancel'));

            const cardForm = document.querySelector('.card-form');
            const formEnd = document.querySelector('.form-end');

            cardForm.insertBefore(btn, formEnd);
        }
        else {
            this.postSubmit.textContent = 'Post It';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';

            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            this.id = '';
            this.clearFields();
        }
    }
}

export const ui = new UI();