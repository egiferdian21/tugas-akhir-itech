document.addEventListener("DOMContentLoaded", function () {
    const inputBookTitle = document.getElementById("inputBookTitle");
    const inputBookAuthor = document.getElementById("inputBookAuthor");
    const inputBookYear = document.getElementById("inputBookYear");
    const inputBookIsComplete = document.getElementById("inputBookIsComplete");
    const bookSubmit = document.getElementById("bookSubmit");
    const searchBookTitle = document.getElementById("searchBookTitle");
    const searchSubmit = document.getElementById("searchSubmit");
    const incompleteBookshelfList = document.getElementById(
        "incompleteBookshelfList"
    );
    const completeBookshelfList = document.getElementById(
        "completeBookshelfList"
    );

    function createBookItem(title, author, year, isComplete) {
        const bookTitle = document.createElement("h3");
        bookTitle.innerText = title;

        const bookAuthor = document.createElement("p");
        bookAuthor.innerText = `Penulis: ${author}`;

        const bookYear = document.createElement("p");
        bookYear.innerText = `Tahun: ${year}`;

        const action = document.createElement("div");
        action.classList.add("action");

        const buttonContainer = document.createElement("div");

        const removeButton = document.createElement("button");
        removeButton.classList.add("red");
        removeButton.innerText = "Hapus buku";
        removeButton.addEventListener("click", function () {
            removeBookFromStorage(title);
            renderBookshelf();
        });

        action.appendChild(buttonContainer);
        buttonContainer.appendChild(removeButton);

        const article = document.createElement("article");
        article.classList.add("book_item");
        article.appendChild(bookTitle);
        article.appendChild(bookAuthor);
        article.appendChild(bookYear);
        article.appendChild(action);

        if (isComplete) {
            const undoButton = document.createElement("button");
            undoButton.classList.add("green");
            undoButton.innerText = "Belum selesai di Baca";
            undoButton.addEventListener("click", function () {
                markAsIncomplete(title);
                renderBookshelf();
            });
            buttonContainer.insertBefore(undoButton, removeButton);
            article.classList.add("complete");
        } else {
            const completeButton = document.createElement("button");
            completeButton.classList.add("green");
            completeButton.innerText = "Selesai dibaca";
            completeButton.addEventListener("click", function () {
                markAsComplete(title);
                renderBookshelf();
            });
            buttonContainer.insertBefore(completeButton, removeButton);
        }
         
        function addBookToStorage(title, author, year, isComplete) {
            let books = [];
            if (localStorage.getItem("books")) {
                books = JSON.parse(localStorage.getItem("books"));
            }

            const newBook = {
                id: generateUniqueId(),
                title: title.toLowerCase(),
                author: author,
                year: year,
                isComplete: isComplete
            };

            books.push(newBook);
            localStorage.setItem("books", JSON.stringify(books));
        }


        function searchBooksByTitle(searchText) {
            let books = [];
            if (localStorage.getItem("books")) {
                books = JSON.parse(localStorage.getItem("books"));

                const filteredBooks = books.filter((book) =>
                    book.title.toLowerCase().includes(searchText.toLowerCase())
                );

                return filteredBooks;
            }
            return [];
        }

        return article;
    }

    function addBookToStorage(id, title, author, year, isComplete) {
        let books = [];
        if (localStorage.getItem("books")) {
            books = JSON.parse(localStorage.getItem("books"));
        }

        books.push({ title, author, year, isComplete });
        localStorage.setItem("books", JSON.stringify(books));
    }

    function removeBookFromStorage(title) {
        let books = [];
        if (localStorage.getItem("books")) {
            books = JSON.parse(localStorage.getItem("books"));
            const updatedBooks = books.filter((book) => book.title !== title);
            localStorage.setItem("books", JSON.stringify(updatedBooks));
        }
    }

    function markAsComplete(title) {
        let books = [];
        if (localStorage.getItem("books")) {
            books = JSON.parse(localStorage.getItem("books"));
            const bookIndex = books.findIndex((book) => book.title === title);
            if (bookIndex !== -1) {
                books[bookIndex].isComplete = true;
                localStorage.setItem("books", JSON.stringify(books));
            }
        }
    }

    function markAsIncomplete(title) {
        let books = [];
        if (localStorage.getItem("books")) {
            books = JSON.parse(localStorage.getItem("books"));
            const bookIndex = books.findIndex((book) => book.title === title);
            if (bookIndex !== -1) {
                books[bookIndex].isComplete = false;
                localStorage.setItem("books", JSON.stringify(books));
            }
        }
    }

    function renderBookshelf() {
        incompleteBookshelfList.innerHTML = "";
        completeBookshelfList.innerHTML = "";

        let books = [];
        if (localStorage.getItem("books")) {
            books = JSON.parse(localStorage.getItem("books"));

            books.forEach((book) => {
                const { title, author, year, isComplete } = book;
                const bookItem = createBookItem(title, author, year, isComplete);

                if (isComplete) {
                    completeBookshelfList.appendChild(bookItem);
                } else {
                    incompleteBookshelfList.appendChild(bookItem);
                }
            });
        }
    }

    bookSubmit.addEventListener("click", function (e) {
        e.preventDefault();

        const title = inputBookTitle.value;
        const author = inputBookAuthor.value;
        const year = inputBookYear.value;
        const isComplete = inputBookIsComplete.checked;

        addBookToStorage(title, author, year, isComplete);
        renderBookshelf();

        inputBookTitle.value = "";
        inputBookAuthor.value = "";
        inputBookYear.value = "";
        inputBookIsComplete.checked = false;
    });

    searchSubmit.addEventListener("click", function (e) {
        e.preventDefault();

        const searchText = searchBookTitle.value.toLowerCase();

        let books = [];
        if (localStorage.getItem("books")) {
            books = JSON.parse(localStorage.getItem("books"));

            const filteredBooks = books.filter((book) =>
                book.title.toLowerCase().includes(searchText)
            );

            incompleteBookshelfList.innerHTML = "";
            completeBookshelfList.innerHTML = "";

            filteredBooks.forEach((book) => {
                const { title, author, year, isComplete } = book;
                const bookItem = createBookItem(title, author, year, isComplete);

                if (isComplete) {
                    completeBookshelfList.appendChild(bookItem);
                } else {
                    incompleteBookshelfList.appendChild(bookItem);
                }
            });
        }
    });

    renderBookshelf();
});
