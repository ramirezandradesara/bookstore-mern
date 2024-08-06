import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import dotenv from "dotenv";
import bookRoute from "./routes/booksRoutes.js"
const app = express();
// Middleware for parsing request bosy
app.use(express.json());
dotenv.config();
const url = process.env.mongoURL;

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Bookstore");
});

app.use("/books", bookRoute)

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
