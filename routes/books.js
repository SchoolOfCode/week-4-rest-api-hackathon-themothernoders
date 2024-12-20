import express from "express";

import {
  getBook,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
} from "../models/books.js";

const router = express.Router();

// Handle GET request to fetch all books
router.get("/", async function (req, res) {
  try {
    const books = await getBook();
    res.json({ success: true, payload: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Handle GET request to fetch books by id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const book = await getBookById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book with ID not found!" });
    }
    res.json({ success: true, payload: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Handle POST request to add book
router.post("/", async function (req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false });
    }
    const newBook = await createBook(req.body);
    res.status(201).json({ success: true, payload: newBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// MVP 3 - Update a particular book
router.patch("/:id", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false });
    }
    //const bookId = Number(req.params.id);
    //req.params.id is a string! we needed to convert it to a number first
    const updatedBook = await updateBookById(+req.params.id, req.body);
    if (!updatedBook) {
      return res.status(404).json({ success: false });
    }
    res.json({ success: true, payload: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//MVP 3 - delete a book
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await deleteBookById(parseInt(+req.params.id));
    if (!deletedBook) {
      return res.status(404).json({ success: false });
    }
    res.json({ success: true, payload: deletedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
