class Book {
    constructor(id, title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("The Way of Kings", "B. Sanderson", 1007, true);
addBookToLibrary("Words of Radiance", "B. Sanderson", 1088, false);

for (const book of myLibrary) {
    renderBook(book);
}
const newBookButton = document.getElementById("new-book-btn");
newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

const newBookForm = document.getElementById("new-book-form");
newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBookFormData = new FormData(e.target);
    const data = Object.fromEntries(newBookFormData.entries());
    const newBook = new Book(data.title, data.author, data.pages, data.read === "on" ? true : false);
    myLibrary.push(newBook);
    renderBook(newBook);
    newBookDialog.close();
});


const newBookDialog = document.getElementById("new-book-dialog");
newBookDialog.addEventListener("close", e => {
    newBookForm.reset(); 
});

function renderBook(book) {
    const table = document.getElementById("book-list");
    const bookRow = document.createElement("tr");
    bookRow.setAttribute("id", book.id);
    const titleCell = createTitleCell(book);
    const authorCell = createAuthorCell(book);
    const pagesCell = createPagesCell(book);
    const readCell = createReadCell(book);
    const removeCell = createRemoveCell(book);
    
    bookRow.appendChild(titleCell);
    bookRow.appendChild(authorCell);
    bookRow.appendChild(pagesCell);
    bookRow.appendChild(readCell);
    bookRow.appendChild(removeCell);
    table.appendChild(bookRow);
}

function createTitleCell(book) {
    const titleCell = document.createElement("td");
    titleCell.appendChild(document.createTextNode(book.title));
    return titleCell;
}

function createAuthorCell(book) {
    const authorCell = document.createElement("td");
    authorCell.appendChild(document.createTextNode(book.author));
    return authorCell;
}

function createPagesCell(book) {
    const pagesCell = document.createElement("td");
    pagesCell.appendChild(document.createTextNode(book.pages));
    return pagesCell;
}

function createReadCell(book) {
    const readCell = document.createElement("td");
    const readCheckbox = document.createElement("input");
    readCheckbox.setAttribute("type", "checkbox");
    if (book.read) {
        readCheckbox.setAttribute("checked", "");
    }
    readCheckbox.addEventListener("click", e => {
        book.toggleRead();
    });
    readCell.appendChild(readCheckbox);
    return readCell;
}

function createRemoveCell(book) {
    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.textContent = "Remove";
    
    removeButton.addEventListener("click", e => {
        const elementIndex = myLibrary.findIndex(b => b.id === book.id);
        myLibrary.splice(elementIndex, 1);
        document.getElementById(book.id).remove();
    });

    removeCell.appendChild(removeButton);
    return removeCell;
}
