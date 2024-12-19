import express from "express";
// imports the route the books are gonna take.
import bookRouter from "./routes/books.js";

const app = express();

app.use(express.json()); 

app.use("/", bookRouter);

export default app;
