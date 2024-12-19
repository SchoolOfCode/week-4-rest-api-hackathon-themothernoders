import { data } from "../libs/data.js";

// Creates IDs for each book so we dont have to message around with uuvidID 
let bookID = 0;
let books = data.map((book) => ({ ...book, id: ++bookID }));

// makes a clone so we dont mess up the hardcoded books - i tried cloning myself and it didnt work :(
export const originalBook = books.map((book) => {
  return JSON.parse(JSON.stringify(book)); 
});

// This is use to get all the books and put them in an object. I also stored all my hopes and dreams in here.
export async function getBook() {
  return [...books]; 
}