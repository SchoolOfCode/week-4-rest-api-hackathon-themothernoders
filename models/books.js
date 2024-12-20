import { data } from "../libs/books.js";

// Creates IDs for each book so we dont have to message around with uuvidID 
let bookId = 0;
let books = data.map((book) => ({ ...book, id: ++bookId }));

// makes a clone so we dont mess up the hardcoded books - i tried cloning myself and it didnt work :(
export const originalBook = books.map((book) => {
  return JSON.parse(JSON.stringify(book)); 
});

// This is use to get all the books and put them in an object. I also stored all my hopes and dreams in here.
export async function getBook() {
  return [...books]; 
}

// Getting a book by giving an ID
export async function getBookById(bookId) {
  return books.find(({ id }) => id === bookId);
}

// Creating a new book entry as per input details
export async function createBook(newBook) {
  const created = {
    ...newBook,
    id: ++bookId,
  };
  books = [...books, created];
  return created;
}

// Finding a particluar book entry by ID
function findBookIndexById(bookId) {
  return books.findIndex(({ id }) => id === bookId);
}

// Updating details of a book identified by ID
export async function updateBookById(bookId, updates) {
  const index = findBookIndexById(bookId);
  if (index === -1) { return; }
  const oldBook = books[index];
  const updated = { ...oldBook, ...updates, id: bookId };

  books = [
    ...books.slice(0, index),
    updated,
    ...books.slice(index + 1),
  ];

  return updated;
}

//function to handle DELETE request
export async function deleteBookById(bookId) {
  const index = findBookIndexById(bookId);

  if (index === -1) {
    return;
  }

  const deleted = books[index];
  books = [...books.slice(0, index), ...books.slice(index + 1)];
  return deleted;
}
