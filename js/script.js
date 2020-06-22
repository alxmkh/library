document.addEventListener("DOMContentLoaded", function () {
    'use strict';

    class Library {

        constructor() {
            this.myLibrary = [];
            this.storageLibrary = [];
            this.addBtn = document.querySelector('#addBtn');
            this.createBtn = document.querySelector('#createBtn');
            this.delCard = document.querySelector('.card-columns');
        }

        createCardHtmlContext() {
            this.cardDeck = document.querySelector(".card-columns");
            this.modalTitle = document.querySelector('#inputTitle');
            this.modalAuthor = document.querySelector('#inputAuthor');
            this.modalPages = document.querySelector('#inputPages');
            this.modalIsRead = document.querySelector('#isRead');

            this.mainCard = document.createElement('div');
            this.cardBody = document.createElement('div');
            this.cardContext = document.createElement('div');
            this.closeCard = document.createElement('div');
            this.faClose = document.createElement('i');
            // Create title.
            this.divTitle = document.createElement('div');
            this.titleLabel = document.createElement('label');
            this.title = document.createElement('label');
            // Create author.
            this.divAuthor = document.createElement('div');
            this.authorLabel = document.createElement('label');
            this.author = document.createElement('label');
            // Create pages.
            this.divPages = document.createElement('div');
            this.pagesLabel = document.createElement('label');
            this.pages = document.createElement('label');
            // Create isRead.
            this.divRead = document.createElement('div');
            this.readLabel = document.createElement('label');
            //const isRead = document.createElement('label');
            this.isRead = document.createElement('input');
        }

        createBook(pId = this.modalTitle.value + this.modalAuthor.value,
            pTitle = this.modalTitle.value, pAuthor = this.modalAuthor.value,
            pPages = this.modalPages.value, pIsRead = this.modalIsRead.checked) {

            // Set text to title.
            this.titleLabel.textContent = 'Title:\xa0';
            this.title.textContent = pTitle;
            // Set text to author.
            this.authorLabel.textContent = 'Author:\xa0';
            this.author.textContent = pAuthor;
            // Set text to pages.
            this.pagesLabel.textContent = 'Pages:\xa0';
            this.pages.textContent = pPages;
            // Set text to isRead.
            this.readLabel.textContent = 'Is read?:\xa0';
            this.isRead.checked = Boolean(pIsRead);

            this.mainCard.setAttribute('class', 'card');
            this.mainCard.setAttribute('id', pId);
            this.cardBody.setAttribute('class', 'card-body');
            this.cardContext.setAttribute('class', 'card-text');
            this.closeCard.setAttribute('class', 'row justify-content-md-end m-0');
            this.faClose.setAttribute('class', 'fa fa-times close');
            // Add CSS to title.
            this.divTitle.setAttribute('class', 'row justify-content-md-start');
            // Add CSS to author.
            this.divAuthor.setAttribute('class', 'row justify-content-md-start');
            // Add CSS to pages.
            this.divPages.setAttribute('class', 'row justify-content-md-start');
            // Add CSS to read.
            this.divRead.setAttribute('class', 'row justify-content-md-start');
            this.isRead.setAttribute('type', 'checkbox');
            this.isRead.setAttribute('class', 'form-check-input-right check');
            this.isRead.setAttribute('style', 'margin-top: 7px');

            this.closeCard.appendChild(this.faClose);
            this.cardDeck.appendChild(this.mainCard);
            this.mainCard.appendChild(this.cardBody);
            this.cardBody.appendChild(this.cardContext);
            this.cardContext.appendChild(this.closeCard);
            // Title render.
            this.cardContext.appendChild(this.divTitle);
            this.divTitle.appendChild(this.titleLabel);
            this.divTitle.appendChild(this.title);
            // Author render.
            this.cardContext.appendChild(this.divAuthor);
            this.divAuthor.appendChild(this.authorLabel);
            this.divAuthor.appendChild(this.author);
            // Pages render.
            this.cardContext.appendChild(this.divPages);
            this.divPages.appendChild(this.pagesLabel);
            this.divPages.appendChild(this.pages);
            // Read render.
            this.cardContext.appendChild(this.divRead);
            this.divRead.appendChild(this.readLabel);
            this.divRead.appendChild(this.isRead);
        }

        createBookObj(idValue, titleValue, authorValue, pagesValue, isReadValue) {
            return {
                id: idValue,
                title: titleValue,
                author: authorValue,
                pages: pagesValue,
                isRead: isReadValue
            };
        }

        clearModalWindow() {
            this.modalTitle.value = '';
            this.modalAuthor.value = '';
            this.modalPages.value = '';
            this.modalIsRead.checked = false;
        }

        addBookToLibrary(obj) {
            const tmp = this.myLibrary.filter(item => {
                return item.id == obj.id;
            });
            if (tmp.length == 0) {
                this.myLibrary.push(obj);

                this.createBook();
                this.clearModalWindow();
            } else {
                alert('Book already exists in library.');
            }
        }

        deleteBookFromLibrary(id) {
            let tmpObj;
            for (let i = 0; i < this.myLibrary.length; i++) {
                if (this.myLibrary[i].id == id) {
                    tmpObj = this.myLibrary[i];
                    break;
                }
            }

            this.myLibrary.splice(this.myLibrary.indexOf(tmpObj), 1);
            localStorage.setItem('myLibrary', JSON.stringify(this.myLibrary));
            console.log(this.myLibrary);
        }

        changeIsRead(checkBox) {
            let id = checkBox.parentNode.parentNode.parentNode.parentNode.id;

            if (checkBox.checked) {
                for (let i = 0; i < this.myLibrary.length; i++) {
                    if (this.myLibrary[i].id == id) {
                        this.myLibrary[i].isRead = true;
                        localStorage.setItem('myLibrary', JSON.stringify(this.myLibrary));
                    }
                }
            } else {
                for (let i = 0; i < this.myLibrary.length; i++) {
                    if (this.myLibrary[i].id == id) {
                        this.myLibrary[i].isRead = false;
                        localStorage.setItem('myLibrary', JSON.stringify(this.myLibrary));
                    }
                }
            }
        }

        loadFromLocalStorage() {
            if (localStorage.getItem('myLibrary')) {
                let tmyLibrary = JSON.parse(localStorage.getItem('myLibrary'));
                console.log(tmyLibrary);
                tmyLibrary.map(book => {
                    this.createCardHtmlContext();
                    this.createBook(book.id, book.title, book.author, book.pages, book.isRead)
                });
                this.myLibrary = tmyLibrary;
            }
        }

        validTitle() {
            if (this.modalTitle.value == "") {
                document.querySelector('#titleValidator').style.display = 'block';
                document.querySelector('#titleValidator').textContent = "Please input title!";
                return false;
            } else {
                document.querySelector('#titleValidator').style.display = 'none';
                return true;
            }
        }

        validAuthor() {
            if (this.modalAuthor.value == "") {
                document.querySelector('#authorValidator').style.display = 'block';
                const validAuthorDiv = document.querySelector('#authorValidator').textContent = "Please input author!";

                return false;
            } else {
                document.querySelector('#authorValidator').style.display = 'none';
                return true;
            }
        }

        pagesValidator() {
            if (isNaN(this.modalPages.value) || this.modalPages.value < 0 || this.modalPages.value == "") {
                document.querySelector('#pagesValidator').style.display = 'block';
                document.querySelector('#pagesValidator').textContent = "Please input only number > 0!";
                return false;
            } else {
                document.querySelector('#pagesValidator').style.display = 'none';
                return true;
            }
        }

        showModal() {
            this.addBtn.addEventListener('click', function () {
                $('#addBookForm').modal('show');
            });
        }

        addBookWrapper(e) {
            console.log(this);
            this.createCardHtmlContext();

            if (this.validTitle() && this.validAuthor() && this.pagesValidator()) {
                $('#addBookForm').modal('hide');
                console.log(this);
                this.addBookToLibrary(this.createBookObj(this.modalTitle.value + this.modalAuthor.value,
                    this.modalTitle.value, this.modalAuthor.value, this.modalPages.value, this.modalIsRead.checked));
                console.log(this.myLibrary);
                localStorage.setItem('myLibrary', JSON.stringify(this.myLibrary));
            }
        }

        deleteBookWrapper(e) {
            if (e.target.classList.contains("close")) {
                localStorage.setItem('myLibrary', JSON.stringify(this.myLibrary));
                let id = e.target.parentNode.parentNode.parentNode.parentNode.id;
                this.deleteBookFromLibrary(id);
                let close = e.target.parentNode.parentNode.parentNode.parentNode;
                close.remove();
            }

            if (e.target.classList.contains('check')) {
                let checkBox = e.target;
                this.changeIsRead(checkBox);
            }
        }

        addBook() {
            this.createBtn.addEventListener('click', (e) => this.addBookWrapper(e));
        }

        deleteBook() {
            this.delCard.addEventListener('click', (e) => this.deleteBookWrapper(e));
        }

    }

    const library = new Library();
    library.loadFromLocalStorage();
    library.showModal();
    library.addBook();
    library.deleteBook();

});