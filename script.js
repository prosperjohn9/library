const library = []; // Array to store book objects

// Book Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Function to add a book to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    library.push(newBook);
}

// Function to display books in the library
function displayBooks() {
    const bookContainer = document.getElementById("bookContainer");
    bookContainer.innerHTML = ""; // Clear the container
    for (let i = 0; i < library.length; i++) {
        const book = library[i];
        // Create a card for each book
        const card = document.createElement("div");
        card.className = "card";
        // Display book details
        card.innerHTML = `
        <h3>${book.title}</h3>
        <p>Written By: ${book.author}</p>
        <p>Number of Pages: ${book.pages}</p>
        <p>Have You Read This?: ${book.read ? "Yes" : "No"}</p>
        <button class="editButton" data-index="${i}">Edit</button>
        <button class="readStatusButton" data-index="${i}">Change Read Status</button>
        <button class="removeButton" data-index="${i}">Remove Book From Library</button>`;
        bookContainer.appendChild(card);
    }
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    // Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readYes = document.getElementById("readYes");
    const readNo = document.getElementById("readNo");
    // Determine the "Read" status based on the checkboxes
    const read = readYes.checked ? true : false;
    // Add book to library
    addBookToLibrary(title, author, pages, read);
    // Clear form fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    readYes.checked = false;
    readNo.checked = false;
    // Close the modal
    toggleModal();
    // Display updated books
    displayBooks();
}

// Function to toggle the add book modal
function toggleModal() {
    const modal = document.getElementById("addBookModal");
    modal.style.display = modal.style.display === "none" ? "block" : "none";
}

// Function to remove a book from the library
function removeBookFromLibrary(index) {
    library.splice(index, 1);
    displayBooks();
}

// Add event listeners 
document.getElementById("addBookButton").addEventListener("click", toggleModal);
document.getElementById("addBookForm").addEventListener("submit", handleFormSubmit);
document.getElementById("bookContainer").addEventListener("click", function (event) {
    if (event.target.classList.contains("removeButton")) {
        const index = event.target.getAttribute("data-index");
        removeBookFromLibrary(index);
    }
    if (event.target.classList.contains("editButton")) {
        const index = event.target.getAttribute("data-index");
        editBook(index);
    }
    if (event.target.classList.contains("readStatusButton")) {
        const index = event.target.getAttribute("data-index");
        changeReadStatus(index);
    }
});

// Function to edit a book
function editBook(index) {
    const book = library[index];
    // Prompt user for new details
    const newTitle = prompt("Enter new title:", book.title);
    const newAuthor = prompt("Enter new author:", book.author);
    const newPages = prompt("Enter new pages:", book.pages);
    // Update book details
    book.title = newTitle;
    book.author = newAuthor;
    book.pages = newPages;
    // Display updated books
    displayBooks();
}

// Function to change the read status of a book
function changeReadStatus(index) {
    const book = library[index];
    book.read = !book.read // Toggle read status
    // Display updated books
    displayBooks();
}

// Exclusive behavior for "read" checkboxes
const readYes = document.getElementById("readYes");
const readNo = document.getElementById("readNo");
readYes.addEventListener("click", function () {
    readNo.checked = false;
});
readNo.addEventListener("click", function () {
    readYes.checked = false;
});

// Add new books to the library array
library.push(
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        pages: 1178,
        read: true
    },
    {
        title: "The 48 Laws of Power",
        author: "Robert Greene",
        pages: 476,
        read: false
    },
    {
        title: "A Game of Thrones",
        author: "George R.R. Martin",
        pages: 694,
        read: false
    },
    {
        title: "Harry Porter and the Philosopher's Stone",
        author: "J.K. Rowling",
        pages: 223,
        read: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 310,
        read: false
    }
);

// Call the displayBooks() function to initially display books in library
displayBooks();