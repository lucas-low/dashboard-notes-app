//attach the class books element from the DOM --> to the object variable {books}
const books = document.querySelector(".books")

//hardcode sample data for testing
const myLibrary = [{
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

function createBookElement(el, content, className) {
    //create element dynamically into element/el parameters passed in from createBookItem's arg i.e.: h1, p
    const element = document.createElement(el);
    //sets element's text content from content arg
    element.textContent = content;
    element.setAttribute("class", className)
    return element
}

function createReadElement(bookItem, book) {
    const read = document.createElement("div")
    read.setAttribute("class", "book-read")
    read.appendChild(createBookElement("p", "Have you read it?", "book-read-title"))
    const input = document.createElement("input")
    input.type = "checkbox"
    input.addEventListener("click", (e) => {
        if (e.target.checked) {
            element.setAttribute("class", className)
        }
    })
    return read
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
    //return the values above passed into books class in the DOM
    books.insertAdjacentElement("afterbegin", bookItem)
}

function renderBooks() {
    // pass map() method to myLibrary populated from values returned from function createBookItem(book,index)
    myLibrary.map((book, index) =>
        createBookItem(book, index))
}


renderBooks()