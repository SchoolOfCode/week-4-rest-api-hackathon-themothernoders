import express from "express";
import { getBook } from "../models/books.js";

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

export default router;
