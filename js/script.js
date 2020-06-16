document.addEventListener("DOMContentLoaded", function () {
    'use strict';
    let myLibrary = [];
    let storageLibrary = [];

    const addBtn = document.querySelector('#addBtn');
    const createBtn = document.querySelector('#createBtn');
    const delCard = document.querySelector('.card-columns');

    const cardDeck = document.querySelector(".card-columns");
    const modalTitle = document.querySelector('#inputTitle');
    const modalAuthor = document.querySelector('#inputAuthor');
    const modalPages = document.querySelector('#inputPages');
    const modalIsRead = document.querySelector('#isRead');

    function createBookObj(idValue, titleValue, authorValue, pagesValue, isReadValue) {
        return {
            id: idValue,
            title: titleValue,
            author: authorValue,
            pages: pagesValue,
            isRead: isReadValue
        };
    }
    // So badly ... 
    function renderHtmlFromLocalStorage(p_id, p_title, p_author, p_pages, p_read) {
        const mainCard = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardContext = document.createElement('div');
        const closeCard = document.createElement('div');
        const faClose = document.createElement('i');
        // Create title.
        const divTitle = document.createElement('div');
        const titleLabel = document.createElement('label');
        const title = document.createElement('label');
        // Create author.
        const divAuthor = document.createElement('div');
        const authorLabel = document.createElement('label');
        const author = document.createElement('label');
        // Create pages.
        const divPages = document.createElement('div');
        const pagesLabel = document.createElement('label');
        const pages = document.createElement('label');
        // Create isRead.
        const divRead = document.createElement('div');
        const readLabel = document.createElement('label');
        //const isRead = document.createElement('label');
        const isRead = document.createElement('input');

        // Set text to title.
        titleLabel.textContent = 'Title:\xa0';
        title.textContent = p_title;
        // Set text to author.
        authorLabel.textContent = 'Author:\xa0';
        author.textContent = p_author;
        // Set text to pages.
        pagesLabel.textContent = 'Pages:\xa0';
        pages.textContent = p_pages;
        // Set text to isRead.
        readLabel.textContent = 'Is read?:\xa0';
        isRead.checked = Boolean(p_read);

        mainCard.setAttribute('class', 'card');
        mainCard.setAttribute('id', p_id);
        cardBody.setAttribute('class', 'card-body');
        cardContext.setAttribute('class', 'card-text');
        closeCard.setAttribute('class', 'row justify-content-md-end m-0');
        faClose.setAttribute('class', 'fa fa-times close');
        // Add CSS to title.
        divTitle.setAttribute('class', 'row justify-content-md-start');
        // Add CSS to author.
        divAuthor.setAttribute('class', 'row justify-content-md-start');
        // Add CSS to pages.
        divPages.setAttribute('class', 'row justify-content-md-start');
        // Add CSS to read.
        divRead.setAttribute('class', 'row justify-content-md-start');
        isRead.setAttribute('type', 'checkbox');
        isRead.setAttribute('class', 'form-check-input-right check');
        isRead.setAttribute('style', 'margin-top: 7px');

        closeCard.appendChild(faClose);
        cardDeck.appendChild(mainCard);
        mainCard.appendChild(cardBody);
        cardBody.appendChild(cardContext);
        cardContext.appendChild(closeCard);
        // Title render.
        cardContext.appendChild(divTitle);
        divTitle.appendChild(titleLabel);
        divTitle.appendChild(title);
        // Author render.
        cardContext.appendChild(divAuthor);
        divAuthor.appendChild(authorLabel);
        divAuthor.appendChild(author);
        // Pages render.
        cardContext.appendChild(divPages);
        divPages.appendChild(pagesLabel);
        divPages.appendChild(pages);
        // Read render.
        cardContext.appendChild(divRead);
        divRead.appendChild(readLabel);
        divRead.appendChild(isRead);
    }

    function Book() {
        // Create card area.
        const mainCard = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardContext = document.createElement('div');
        const closeCard = document.createElement('div');
        const faClose = document.createElement('i');
        // Create title.
        const divTitle = document.createElement('div');
        const titleLabel = document.createElement('label');
        const title = document.createElement('label');
        // Create author.
        const divAuthor = document.createElement('div');
        const authorLabel = document.createElement('label');
        const author = document.createElement('label');
        // Create pages.
        const divPages = document.createElement('div');
        const pagesLabel = document.createElement('label');
        const pages = document.createElement('label');
        // Create isRead.
        const divRead = document.createElement('div');
        const readLabel = document.createElement('label');
        //const isRead = document.createElement('label');
        const isRead = document.createElement('input');

        // Set text to title.
        titleLabel.textContent = 'Title:\xa0';
        title.textContent = modalTitle.value;
        // Set text to author.
        authorLabel.textContent = 'Author:\xa0';
        author.textContent = modalAuthor.value;
        // Set text to pages.
        pagesLabel.textContent = 'Pages:\xa0';
        pages.textContent = modalPages.value;
        // Set text to isRead.
        readLabel.textContent = 'Is read?:\xa0';
        isRead.checked = modalIsRead.checked;

        mainCard.setAttribute('class', 'card');
        mainCard.setAttribute('id', modalTitle.value + modalAuthor.value);
        cardBody.setAttribute('class', 'card-body');
        cardContext.setAttribute('class', 'card-text');
        closeCard.setAttribute('class', 'row justify-content-md-end m-0');
        faClose.setAttribute('class', 'fa fa-times close');
        // Add CSS to title.
        divTitle.setAttribute('class', 'row justify-content-md-start');
        // Add CSS to author.
        divAuthor.setAttribute('class', 'row justify-content-md-start');
        // Add CSS to pages.
        divPages.setAttribute('class', 'row justify-content-md-start');
        // Add CSS to read.
        divRead.setAttribute('class', 'row justify-content-md-start');
        isRead.setAttribute('type', 'checkbox');
        isRead.setAttribute('class', 'form-check-input-right check');
        isRead.setAttribute('style', 'margin-top: 7px');

        closeCard.appendChild(faClose);
        cardDeck.appendChild(mainCard);
        mainCard.appendChild(cardBody);
        cardBody.appendChild(cardContext);
        cardContext.appendChild(closeCard);
        // Title render.
        cardContext.appendChild(divTitle);
        divTitle.appendChild(titleLabel);
        divTitle.appendChild(title);
        // Author render.
        cardContext.appendChild(divAuthor);
        divAuthor.appendChild(authorLabel);
        divAuthor.appendChild(author);
        // Pages render.
        cardContext.appendChild(divPages);
        divPages.appendChild(pagesLabel);
        divPages.appendChild(pages);
        // Read render.
        cardContext.appendChild(divRead);
        divRead.appendChild(readLabel);
        divRead.appendChild(isRead);
    }

    function clearModalWindow() {
        modalTitle.value = '';
        modalAuthor.value = '';
        modalPages.value = '';
        modalIsRead.checked = false;
    }

    function addBookToLibrary(obj) {
        const tmp = myLibrary.filter(item => {
            return item.id == obj.id;
        });
        if (tmp.length == 0) {
            myLibrary.push(obj);
            new Book();
            clearModalWindow();
        } else {
            alert('Book already exists in library.');
        }
    }

    function deleteBookFromLibrary(id) {
        let tmpObj;
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id == id) {
                tmpObj = myLibrary[i];
                break;
            }
        }

        myLibrary.splice(myLibrary.indexOf(tmpObj), 1);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }

    function changeIsRead(checkBox) {
        let id = checkBox.parentNode.parentNode.parentNode.parentNode.id;

        if (checkBox.checked) {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == id) {
                    myLibrary[i].isRead = true;
                }
            }
        } else {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == id) {
                    myLibrary[i].isRead = false;
                }
            }
        }
    }

    function validTitle() {
        if (modalTitle.value == "") {
            document.querySelector('#titleValidator').style.display = 'block';
            document.querySelector('#titleValidator').textContent = "Please input title!";
            return false;
        } else {
            document.querySelector('#titleValidator').style.display = 'none';
            return true;
        }
    }

    function validAuthor() {
        if (modalAuthor.value == "") {
            document.querySelector('#authorValidator').style.display = 'block';
            const validAuthorDiv = document.querySelector('#authorValidator').textContent = "Please input author!";

            return false;
        } else {
            document.querySelector('#authorValidator').style.display = 'none';
            return true;
        }
    }

    function pagesValidator() {
        if (isNaN(modalPages.value) || modalPages.value < 0 || modalPages.value == "") {
            document.querySelector('#pagesValidator').style.display = 'block';
            document.querySelector('#pagesValidator').textContent = "Please input only number > 0!";
            return false;
        } else {
            document.querySelector('#pagesValidator').style.display = 'none';
            return true;
        }
    }

    addBtn.addEventListener('click', function () {
        $('#addBookForm').modal('show');
    });

    createBtn.addEventListener('click', function (e) {
        if (validTitle() && validAuthor() && pagesValidator()) {
            $('#addBookForm').modal('hide');
            addBookToLibrary(createBookObj(modalTitle.value + modalAuthor.value,
                modalTitle.value, modalAuthor.value, modalPages.value, modalIsRead.checked));
            console.log(myLibrary);
            localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        }
    });

    delCard.addEventListener('click', function (e) {
        if (e.target.classList.contains("close")) {
            localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
            let id = e.target.parentNode.parentNode.parentNode.parentNode.id;
            deleteBookFromLibrary(id);
            let close = e.target.parentNode.parentNode.parentNode.parentNode;
            close.remove();
        }
        if (e.target.classList.contains('check')) {
            let checkBox = e.target;
            changeIsRead(checkBox);
        }
    });

    if (localStorage.getItem('myLibrary')) {
        let tmyLibrary = JSON.parse(localStorage.getItem('myLibrary'));
        console.log(tmyLibrary);
        tmyLibrary.map(book => renderHtmlFromLocalStorage(book.id, book.title, book.author, book.pages, book.isRead));
        myLibrary = tmyLibrary;
    }

});