import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();
const url = process.env.mongoURL;

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Bookstore");
});

// Route to save a new book
// mongoose create an asynchonous process
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required field: title, author and publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all books
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get book by id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a book by id
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required field: title, author and publishYear",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) return res.status(404).send({ message: "Book not found" });

    return res.status(200).send({ message: "Book update sucessfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to delete a book by id
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) return res.status(404).send({ message: "Book not found" });

    return res.status(200).send({ message: "Book deleted sucessfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(url)
  .then(() => {
    console.log("Database running. App connected to database");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running. App is listening to port: ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
