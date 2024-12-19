import express from "express";
import { getBook } from "../models/books.js";
import { getBookById } from "../models/books.js";

const router = express.Router();

// Handle GET request to fetch all books - 
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


export default router;
