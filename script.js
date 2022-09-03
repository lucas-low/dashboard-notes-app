//attach the class books element from the DOM --> to the object variable {books}
const books = document.querySelector(".books")
const addBook = document.querySelector(".add-book");
//modal rendered at load but hidden unless .add-book listener is clicked
const modal = document.querySelector("#modal");
const span = document.querySelector(".close");

//action from .add-book to show modal and create cards
addBook.addEventListener("click", () => {
    modal.style.display = "block";
    document.querySelector(".form-title").textContent = "Add Book";
    document.querySelector(".form-add-button").textContent = "Add";
});

//click other spots on page hides modal from page
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});
//close the modal if click X
span.addEventListener("click", () => {
    modal.style.display = "none";
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.floor(Math.random() * 1000000);
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    saveAndRenderBooks();
}
const addBookForm = document.querySelector(".add-book-form");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    let newBook = {};
    for (let [name, value] of data) {
        if (name === "book-read") {
            newBook["book-read"] = true;
        } else {
            newBook[name] = value || "";
        }
    }

    if (!newBook["book-read"]) {
        newBook["book-read"] = false;
    }
    if (document.querySelector(".form-title").textContent === "Edit Book") {
        let id = e.target.id;
        let editBook = myLibrary.filter((book) => book.id == id)[0];
        editBook.title = newBook["book-title"];
        editBook.author = newBook["book-author"];
        editBook.pages = newBook["book-pages"];
        editBook.read = newBook["book-read"];
        saveAndRenderBooks();
    } else {
        addBookToLibrary(
            newBook["book-title"],
            newBook["book-author"],
            newBook["book-pages"],
            newBook["book-read"]
        );
    }

    addBookForm.reset();
    modal.style.display = "none";
});
//instantiate hardcode on page
let myLibrary = [{
    title: "abunehneh",
    author: "nehbubu",
    pages: 8000,
    read: true
}, {
    title: "cxvbvbvbnv",
    author: "jghkgfdb",
    pages: 1000,
    read: false
}, {
    title: "abunehneh",
    author: "nehbubu",
    pages: 8000,
    read: true
}, {
    title: "cxvbvbvbnv",
    author: "jghkgfdb",
    pages: 1000,
    read: false
}
]
function addLocalStorage() {
    // localStorage => save things in key value pairs - key = library : myLibrary
    myLibrary = JSON.parse(localStorage.getItem("library")) || [];
    saveAndRenderBooks();
}


function createBookElement(el, content, className) {
    //create element dynamically into element/el parameters passed in from createBookItem's arg i.e.: h1, p
    const element = document.createElement(el);
    //sets element's text content from content arg
    element.textContent = content;
    element.setAttribute("class", className)
    return element
}
//create and toggles on/off checkbox
function createReadElement(bookItem, book) {
    const read = document.createElement("div")
    read.setAttribute("class", "book-read")
    read.appendChild(createBookElement("p", "Have you read it?", "book-read-title"))
    const input = document.createElement("input")
    input.type = "checkbox"
    input.addEventListener("click", (e) => {
        if (e.target.checked) {
            bookItem.setAttribute("class", "card book read-checked");
            book.read = true;
            saveAndRenderBooks();
        } else {
            bookItem.setAttribute("class", "card book read-unchecked");
            book.read = false;
            saveAndRenderBooks();
        }
    });
    if (book.read) {
        input.checked = true;
        bookItem.setAttribute("class", "card book read-checked");
    }
    read.appendChild(input);
    return read
}
//create and update from forms filled
function fillOutEditForm(book) {
    modal.style.display = "block";
    document.querySelector(".form-title").textContent = "Edit Book";
    document.querySelector(".form-add-button").textContent = "Edit";
    document.querySelector(".add-book-form").setAttribute("id", book.id);
    document.querySelector("#book-title").value = book.title || "";
    document.querySelector("#book-author").value = book.author || "";
    document.querySelector("#book-pages").value = book.pages || "";
    document.querySelector("#book-read").checked = book.read;
}
//create the edit icon w/ event listener
function createEditIcon(book) {
    const editIcon = document.createElement("img");
    editIcon.src = "./assets/img/icons8-edit-30.png";
    editIcon.setAttribute("class", "edit-icon");
    editIcon.addEventListener("click", () => {
        fillOutEditForm(book);
    });
    return editIcon;
}


//book parameter is used to call as arg from createBookElement returning the value in template strings, 
//repeat for all required value to return into books class
function createBookItem(book, index) {
    //creates bookItem element with the attributes id, key, class
    const bookItem = document.createElement("div")
    bookItem.setAttribute("id", index)
    bookItem.setAttribute("key", index)
    bookItem.setAttribute("class", "card book")
    //pass args to createBookElement as template literals then appendChild attach to bookItem
    bookItem.appendChild(
        createBookElement("p", `Title: ${book.title}`, "book-title"));
    bookItem.appendChild(
        createBookElement("p", `Author: ${book.author}`, "book-author"));
    bookItem.appendChild(
        createBookElement("p", `Pages: ${book.pages}`, "book-pages"));
    bookItem.appendChild(createReadElement(bookItem, book))
    bookItem.appendChild(createBookElement("button", "X", "delete"));
    bookItem.appendChild(createIcons());
    bookItem.appendChild(createEditIcon(book));
    //delete feature click X
    bookItem.querySelector(".delete").addEventListener("click", () => {
        deleteBook(index);
    });

    //return the values above passed into books class in the DOM
    books.insertAdjacentElement("afterbegin", bookItem)
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    saveAndRenderBooks();
}


function createIcons() {
    const div = createBookElement("div", "", "icons");

    const icon1 = document.createElement("img");
    icon1.setAttribute("class", "action-img");
    icon1.src = "./assets/img/bookmark.png";
    const icon2 = document.createElement("img");
    icon2.setAttribute("class", "action-img");
    icon2.src = "./assets/img/delete.png";
    const icon3 = document.createElement("img");
    icon3.setAttribute("class", "action-img");
    icon3.src = "./assets/img/share.png";

    div.appendChild(icon1);
    div.appendChild(icon2);
    div.appendChild(icon3);
    return div;
}

function renderBooks() {
    // pass map() method to myLibrary populated from values returned from function createBookItem(book,index)
    books.textContent = "";
    myLibrary.map((book, index) => {
        createBookItem(book, index);
    });
}

function saveAndRenderBooks() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    renderBooks();
}

addLocalStorage();